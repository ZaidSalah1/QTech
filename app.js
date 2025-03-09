const express = require("express");
const app = express();
const mysql = require("mysql2");
const path = require('path');
const multer = require("multer"); // Import multer
const session = require("express-session");



const port = process.env.PORT || 1001;
const BASE_URL = process.env.BASE_URL || ""; // Define a base URL from env variables


app.use(express.json());

const connection = mysql.createPool({
    host: process.env.DB_HOST,  // sql109.infinityfree.com
    user: process.env.DB_USER,  // if0_38335742
    password: process.env.DB_PASSWORD,  // (Your vPanel Password)
    database: process.env.DB_NAME,  // if0_38335742_QTech
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});




connection.getConnection((err, conn) => {
    if (err) {
        console.log("Error connection: ", err.stack);
        return;
    }

    try {
        // Perform your database operations here
        conn.query('SELECT * FROM products', (err, results) => {
            if (err) {
                console.log('Error executing query:', err);
            } else {
                console.log('Query results:', results);
            }
        });
    } catch (error) {
        console.log("Error during query execution: ", error);
    } finally {
        // Always release the connection in the finally block
        conn.release();  // This will execute regardless of whether there was an error or not
    }
});



// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));


// Optional: Explicitly serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename files to avoid conflicts
    }
});


const upload = multer({ storage: storage });


// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Endpoint to handle file uploads
app.post("/upload-image", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    // Determine the correct base URL
    const baseUrl = BASE_URL || `${req.protocol}://${req.get("host")}`; // Use env variable if available
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.json({ url: fileUrl });
});

// Storage configuration for ads images
const adsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/ads"); // Save ads images in 'uploads/ads'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadAds = multer({ storage: adsStorage });

app.post("/upload-ads-image", uploadAds.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const fileUrl = `${baseUrl}/uploads/ads/${req.file.filename}`;

    res.json({ url: fileUrl });
});


// API to upload the ad image and insert ad details into the database
app.post('/upload-ads', async (req, res) => {
    const { uploadedAdsImgURL, ad_type } = req.body;

    if (!uploadedAdsImgURL || uploadedAdsImgURL.length === 0) {
        return res.status(400).json({ error: "No image URLs provided" });
    }

    try {
        // Step 1: Fetch existing images from the database
        const existingImagesQuery = 'SELECT image_url FROM ads WHERE ad_type = ?';
        const existingImages = await new Promise((resolve, reject) => {
            connection.query(existingImagesQuery, [ad_type], (err, result) => {
                if (err) reject(err);
                else resolve(result.map(row => row.image_url));
            });
        });

        // Step 2: Determine images to delete (existing but not in the new list)
        const imagesToDelete = existingImages.filter(img => !uploadedAdsImgURL.includes(img));
        if (imagesToDelete.length > 0) {
            const deleteQuery = 'DELETE FROM ads WHERE image_url IN (?) AND ad_type = ?';
            await new Promise((resolve, reject) => {
                connection.query(deleteQuery, [imagesToDelete, ad_type], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        }

        // Step 3: Insert only new images (not already in the database)
        for (const url of uploadedAdsImgURL) {
            if (!existingImages.includes(url)) {
                const insertQuery = 'INSERT INTO ads (image_url, ad_type) VALUES (?, ?)';
                await new Promise((resolve, reject) => {
                    connection.query(insertQuery, [url, ad_type], (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });
            }
        }

        res.json({ message: "Ads updated successfully" });
    } catch (error) {
        console.error("Database operation error:", error);
        res.status(500).json({ error: "Database error" });
    }
});


// 🔒 **Secure Sessions**
app.use(session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false, // ✅ Don't create session until login
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "strict", // ✅ Prevent session issues
        maxAge: 3600000
    }
}));


// 🔐 **Middleware to Check if User is Logged In**
function checkAuth(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect("/login.html");
    }
    next();
}

// 🔐 **Middleware to Check if User is an Admin**
function checkAdmin(req, res, next) {
    if (!req.session.isAuthenticated || req.session.userType !== "admin") {
        return res.status(403).send("Forbidden: Admins only");
    }
    next();
}

app.get("/dashboard", (req, res) => {
    console.log("dashboard requested"); // ✅ Now it will log
    if (!req.session.isAuthenticated) {
        console.log("Not authenticated, redirecting...");
        return res.redirect("/login.html");
    }
    console.log("Sending dashboard file...");
    res.sendFile(path.join(__dirname, "private/dashboard.html"));
});


app.get("/check-session", (req, res) => {
    if (!req.session.isAuthenticated) {
        return res.json({ isAuthenticated: false });
    }
    res.json({ isAuthenticated: true });
});

// 🚪 **Logout Route**
app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("❌ Logout Error:", err);
            return res.status(500).json({ success: false, message: "Logout failed" });
        }
        // Return a JSON response
        res.json({ success: true, message: "Logout successful!" });
    });
});


// Handle login request
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    console.log("Attempting login for user:", email);  // Log the login attempt

    connection.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, results) => {
            if (err) {
                console.error("❌ Login Error:", err);
                return res.status(500).send("Database error");
            }

            console.log("Query Results:", results);  // Log the query results

            if (results.length > 0) {
                req.session.isAuthenticated = true;

                // Assign userType based on is_admin column value
                req.session.userType = results[0].is_admin === 'yes' ? 'admin' : 'user';

                // Log the userType to the console
                // console.log("User type set to:", req.session.userType);  // Log userType

                res.json({ success: true, message: "Login successful!" });
            } else {
                // console.log("Invalid credentials for user:", email);  // Log failed login
                res.status(401).json({ success: false, message: "Email or password is incorrect" });
            }
        }
    );
});


app.post("/signup", (req, res) => {
    const { username, phone, email, password } = req.body;

    // Check if email or username already exists
    connection.query(
        "SELECT * FROM users WHERE email = ? OR username = ?",
        [email, username],
        (err, results) => {
            if (err) {
                console.error("❌ Signup Error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }

            if (results.length > 0) {
                // Check if email or username is already taken
                const emailTaken = results.some(user => user.email === email);
                const usernameTaken = results.some(user => user.username === username);

                if (emailTaken) {
                    return res.status(400).json({ success: false, message: "Email is already in use." });
                } else if (usernameTaken) {
                    return res.status(400).json({ success: false, message: "Username is already taken." });
                }
            }

            // Insert new user into the database
            connection.query(
                "INSERT INTO users (username, phone, email, password) VALUES (?, ?, ?, ?)",
                [username, phone, email, password],
                (err, results) => {
                    if (err) {
                        console.error("❌ Signup Error:", err);
                        return res.status(500).json({ success: false, message: "Failed to create account." });
                    }

                    res.json({ success: true, message: "Account created successfully!" });
                }
            );
        }
    );
});



app.get("/products", (req, res) => {
    const sql = `
       SELECT 
            p.id, 
            p.name, 
            p.price, 
            p.discount,
            p.description, 
            p.quantity, 
            p.sales_count, 
            GROUP_CONCAT(pi.image_url) AS images 
        FROM 
            products p
        LEFT JOIN 
            product_images pi 
        ON 
            p.id = pi.product_id
        GROUP BY 
            p.id
        ORDER BY 
            p.created_at DESC;  -- Order by created_at in descending order
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products, ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Convert the comma-separated string into an array
        results.forEach(product => {
            if (product.images) {
                product.images = product.images.split(','); // Split the string into an array
            } else {
                product.images = []; // If no images, set to an empty array
            }
        });

        res.json(results);
    });
});

app.get("/products2", (req, res) => {
    const limit = parseInt(req.query.limit) || 15; // Default limit
    const offset = parseInt(req.query.offset) || 0; // Default offset

    const sql = `
       SELECT 
            p.id, 
            p.name, 
            p.price, 
            p.discount,
            p.description, 
            p.quantity, 
            p.sales_count, 
            GROUP_CONCAT(pi.image_url) AS images 
        FROM 
            products p
        LEFT JOIN 
            product_images pi 
        ON 
            p.id = pi.product_id
        GROUP BY 
            p.id
        ORDER BY 
            p.created_at DESC
        LIMIT ? OFFSET ?;  -- Pagination added
    `;

    connection.query(sql, [limit, offset], (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        results.forEach(product => {
            product.images = product.images ? product.images.split(',') : [];
        });

        res.json(results);
    });
});

app.get("/discountedProducts", (req, res) => {
    const sql = `
       SELECT 
            p.id, 
            p.name, 
            p.price, 
            p.discount,
            p.description, 
            p.quantity, 
            p.sales_count, 
            GROUP_CONCAT(pi.image_url) AS images 
        FROM 
            products p
        LEFT JOIN 
            product_images pi 
        ON 
            p.id = pi.product_id
        WHERE
            p.discount > 0 AND p.discount < p.price  -- Filter to get products with discount
        GROUP BY 
            p.id
        ORDER BY 
            p.created_at DESC
        LIMIT 15;  -- Limit to 15 products with a discount
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products, ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Convert the comma-separated string into an array
        results.forEach(product => {
            if (product.images) {
                product.images = product.images.split(','); // Split the string into an array
            } else {
                product.images = []; // If no images, set to an empty array
            }
        });

        res.json(results);
    });
});

app.get("/getRandomProducts", (req, res) => {
    const sql = `
            SELECT 
            p.id, 
            p.name, 
            p.price, 
            p.discount,
            p.description, 
            p.quantity, 
            p.sales_count, 
            GROUP_CONCAT(pi.image_url) AS images 
        FROM 
            products p
        LEFT JOIN 
            product_images pi 
        ON 
            p.id = pi.product_id
        GROUP BY 
            p.id
        ORDER BY 
            RAND()  -- Order by a random order
        LIMIT 15;  -- Limit the result to 15 random products
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching products, ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Convert the comma-separated string into an array
        results.forEach(product => {
            if (product.images) {
                product.images = product.images.split(','); // Split the string into an array
            } else {
                product.images = []; // If no images, set to an empty array
            }
        });

        res.json(results);
    });
});


app.get("/productsCount", (req, res) => {
    const sql = "SELECT COUNT(*) AS product_count FROM products;";

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching product count, ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Send the product count as a response
        res.json({ product_count: results[0].product_count });
    });
});

app.get("/getProductsTypeCount", (req, res) => {
    let sql = `
        SELECT 
            pt.id AS type_id,
            pt.name AS product_type,
            COUNT(p.id) AS product_count
        FROM 
            product_types pt
        LEFT JOIN 
            products p ON pt.id = p.type_id
        GROUP BY 
            pt.id, pt.name;
    `;

    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
})


app.get('/getProductsByType/:id', (req, res) => {
    const typeId = req.params.id;  // e.g., 1 for CPU, 2 for GPU
    // const productId = req.params.id;
    // Use the typeId to query the database
    const sql = `
        SELECT 
            p.id, 
            p.name, 
            p.price, 
            p.discount,
            p.description, 
            p.quantity, 
            p.sales_count, 
            GROUP_CONCAT(pi.image_url) AS images 
        FROM 
            products p
        LEFT JOIN 
            product_images pi 
        ON 
            p.id = pi.product_id
        WHERE 
            p.type_id = ?  -- Use the passed typeId here
        GROUP BY 
            p.id
        ORDER BY 
            p.created_at DESC;
    `;
    // Assuming you're using a database connection method like pool.query
    connection.query(sql, [typeId], (err, result) => {
        if (err) {
            res.status(500).send('Error querying database');
        } else {
            res.json(result);
        }
    });
});


app.get("/filterProducts", (req, res) => {
    const { type_ids, limit, offset } = req.query; // Get filter and pagination parameters from the frontend

    let sql = `
        SELECT 
            p.id, 
            p.name, 
            p.price, 
            p.discount,
            p.description, 
            p.quantity, 
            p.sales_count, 
            GROUP_CONCAT(pi.image_url) AS images 
        FROM 
            products p
        LEFT JOIN 
            product_images pi 
        ON 
            p.id = pi.product_id
    `;

    // Apply filtering if `type_ids` are provided
    if (type_ids) {
        const typeIdsArray = type_ids.split(',').map(id => parseInt(id));
        sql += ` WHERE p.type_id IN (${typeIdsArray.join(',')})`;
    }

    sql += `
        GROUP BY p.id
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?;
    `;

    connection.query(sql, [parseInt(limit) || 10, parseInt(offset) || 0], (err, results) => {
        if (err) {
            console.error("Error fetching filtered products,", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        results.forEach(product => {
            product.images = product.images ? product.images.split(',') : [];
        });

        res.json(results);
    });
});



app.get("/product/:id", (req, res) => {
    const productId = req.params.id;

    const sql = `
              SELECT 
    p.id, 
    p.name, 
    p.price, 
    p.discount,
    p.description, 
    p.quantity, 
    p.sales_count, 
    COALESCE(pt.id, 0) AS product_type_id,  -- Return the ID of the product type
    COALESCE(pt.name, 'Uncategorized') AS product_type_name,  -- Optional: Return the name for debugging
    GROUP_CONCAT(pi.image_url) AS images
FROM 
    products p
LEFT JOIN 
    product_images pi ON p.id = pi.product_id
LEFT JOIN 
    product_types pt ON p.type_id = pt.id
WHERE 
    p.id = ?
GROUP BY 
    p.id;

    `;

    connection.query(sql, [productId], (err, results) => {
        if (err) {
            console.error("Error fetching product, ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        let product = results[0];  // Extract the first object

        // Convert the comma-separated string into an array
        product.images = product.images ? product.images.split(',') : [];

        res.json(product);  // Return only the first product object
    });
});


app.get("/newest10Product", (req, res) => {

    const sql = `
    SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.discount,
        p.description, 
        p.quantity, 
        p.sales_count, 
        GROUP_CONCAT(pi.image_url) AS images 
    FROM 
        products p
    LEFT JOIN 
        product_images pi 
    ON 
        p.id = pi.product_id
    GROUP BY 
        p.id

        ORDER BY p.created_at DESC 
        LIMIT 15;;

`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching 10 products, ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        results.forEach(product => {
            if (product.images) {
                product.images = product.images.split(',');
            } else {
                product.images = [];
            }
        });

        res.json(results);
    })
})

// Insert product and images into the database
app.post("/add-product", (req, res) => {
    const { name, price, description, quantity, discount, type, images } = req.body;

    if (!name || !price || !quantity || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ error: "Invalid request. Ensure all fields are provided, including images." });
    }

    // Insert the product first
    const productQuery = `INSERT INTO products (name, price, discount, description, quantity, type) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(productQuery, [name, price, discount ? discount : 0, description, quantity, type], (err, result) => {
        if (err) {
            console.error("Error inserting product:", err);
            return res.status(500).json({ error: "Error inserting product" });
        }

        const productId = result.insertId; // Get the newly inserted product ID
        console.log(`✅ Product inserted with ID: ${productId}`);

        // Insert images into product_images table
        const imageQueries = images.map(imageUrl => {
            return new Promise((resolve, reject) => {
                const imageQuery = `INSERT INTO product_images (product_id, image_url) VALUES (?, ?)`;
                connection.query(imageQuery, [productId, imageUrl], (imgErr, imgResult) => {
                    if (imgErr) {
                        console.error("❌ Error inserting image:", imgErr);
                        reject(imgErr);
                    } else {
                        console.log(`✅ Image inserted for product ${productId}: ${imageUrl}`);
                        resolve(imgResult);
                    }
                });
            });
        });

        // Execute all image insertions
        Promise.all(imageQueries)
            .then(() => {
                console.log("✅ All images inserted successfully.");
                res.json({ message: "Product and images added successfully!" });
            })
            .catch((imgErr) => {
                console.error("❌ Error inserting product images:", imgErr);
                res.status(500).json({ error: "Error inserting product images" });
            });
    });
});

app.post("/add-product2", (req, res) => {
    const { name, price, description, quantity, discount, type_id, images } = req.body;

    if (!name || !price || !quantity || !Array.isArray(images) || images.length === 0 || !type_id) {
        return res.status(400).json({ error: "Invalid request. Ensure all fields are provided, including images and product type." });
    }

    // Insert the product with type_id
    const productQuery = `INSERT INTO products (name, price, discount, description, quantity, type_id) VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(productQuery, [name, price, discount || 0, description, quantity, type_id], (err, result) => {
        if (err) {
            console.error("Error inserting product:", err);
            return res.status(500).json({ error: "Error inserting product" });
        }

        const productId = result.insertId; // Get the newly inserted product ID
        console.log(`✅ Product inserted with ID: ${productId}`);

        // Insert images into product_images table
        const imageQueries = images.map(imageUrl => {
            return new Promise((resolve, reject) => {
                const imageQuery = `INSERT INTO product_images (product_id, image_url) VALUES (?, ?)`;
                connection.query(imageQuery, [productId, imageUrl], (imgErr, imgResult) => {
                    if (imgErr) {
                        console.error("❌ Error inserting image:", imgErr);
                        reject(imgErr);
                    } else {
                        console.log(`✅ Image inserted for product ${productId}: ${imageUrl}`);
                        resolve(imgResult);
                    }
                });
            });
        });

        // Execute all image insertions
        Promise.all(imageQueries)
            .then(() => {
                console.log("✅ All images inserted successfully.");
                res.json({ message: "Product and images added successfully!" });
            })
            .catch((imgErr) => {
                console.error("❌ Error inserting product images:", imgErr);
                res.status(500).json({ error: "Error inserting product images" });
            });
    });
});

app.put("/updateProduct/:id", (req, res) => {
    const productId = req.params.id;
    const { name, price, discount, description, quantity, sales_count, type_id, images } = req.body;

    // Step 1: Build the dynamic UPDATE query for the products table
    let updateFields = [];
    let updateValues = [];

    if (name !== undefined) {
        updateFields.push("name = ?");
        updateValues.push(name);
    }
    if (price !== undefined) {
        updateFields.push("price = ?");
        updateValues.push(price);
    }
    if (discount !== undefined) {
        updateFields.push("discount = ?");
        updateValues.push(discount);
    }
    if (description !== undefined) {
        updateFields.push("description = ?");
        updateValues.push(description);
    }
    if (quantity !== undefined) {
        updateFields.push("quantity = ?");
        updateValues.push(quantity);
    }
    if (sales_count !== undefined) {
        updateFields.push("sales_count = ?");
        updateValues.push(sales_count);
    }
    if (type_id !== undefined) {
        updateFields.push("type_id = ?");
        updateValues.push(type_id);
    }

    // If no fields are provided to update, return an error
    if (updateFields.length === 0 && images === undefined) {
        return res.status(400).json({ message: "No fields provided for update" });
    }

    // Add the productId to the values array for the WHERE clause
    updateValues.push(productId);

    // Step 2: Start a transaction
    connection.beginTransaction((err) => {
        if (err) {
            console.error("Error starting transaction: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Step 3: Update the product details (if any fields are provided)
        if (updateFields.length > 0) {
            const updateProductSql = `
                UPDATE products
                SET ${updateFields.join(", ")}
                WHERE id = ?;
            `;
            console.log("updateFields.join(", ")", updateFields.join(", "));


            connection.query(updateProductSql, updateValues, (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error("Error updating product: ", err);
                        res.status(500).json({ message: "Internal Server Error" });
                    });
                }

                if (results.affectedRows === 0) {
                    return connection.rollback(() => {
                        res.status(404).json({ message: "Product not found" });
                    });
                }

                // Proceed to handle images
                handleImages();
            });
        } else {
            // No product fields to update, proceed to handle images
            handleImages();
        }
    });

    // Function to handle image updates
    function handleImages() {
        if (images !== undefined) {
            // Step 4: Insert new images (if any)
            if (images.length > 0) {
                const insertImagesSql = `
                    INSERT INTO product_images (product_id, image_url)
                    VALUES ?;
                `;

                const imageValues = images.map((imageUrl) => [productId, imageUrl]);

                connection.query(insertImagesSql, [imageValues], (err, results) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error("Error inserting images: ", err);
                            res.status(500).json({ message: "Internal Server Error" });
                        });
                    }

                    // Commit the transaction
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error("Error committing transaction: ", err);
                                res.status(500).json({ message: "Internal Server Error" });
                            });
                        }

                        res.json({ message: "Product and images updated successfully" });
                    });
                });
            } else {
                // No images to insert, just commit the transaction
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error("Error committing transaction: ", err);
                            res.status(500).json({ message: "Internal Server Error" });
                        });
                    }

                    res.json({ message: "Product updated successfully (no images)" });
                });
            }
        } else {
            // No images provided, just commit the transaction
            connection.commit((err) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error("Error committing transaction: ", err);
                        res.status(500).json({ message: "Internal Server Error" });
                    });
                }

                res.json({ message: "Product updated successfully" });
            });
        }
    }
});

app.put("/updateProduct2/:id", (req, res) => {
    const productId = req.params.id;
    const { name, price, discount, description, quantity, sales_count, type_id, images } = req.body;

    let updateFields = [];
    let updateValues = [];

    if (name !== undefined) updateFields.push("name = ?"), updateValues.push(name);
    if (price !== undefined) updateFields.push("price = ?"), updateValues.push(price);
    if (discount !== undefined) updateFields.push("discount = ?"), updateValues.push(discount);
    if (description !== undefined) updateFields.push("description = ?"), updateValues.push(description);
    if (quantity !== undefined) updateFields.push("quantity = ?"), updateValues.push(quantity);
    if (sales_count !== undefined) updateFields.push("sales_count = ?"), updateValues.push(sales_count);
    if (type_id !== undefined) updateFields.push("type_id = ?"), updateValues.push(type_id);

    if (updateFields.length === 0 && images === undefined) {
        return res.status(400).json({ message: "No fields provided for update" });
    }

    updateValues.push(productId);

    connection.getConnection((err, conn) => {
        if (err) {
            console.error("Error getting connection: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        conn.beginTransaction((err) => {
            if (err) {
                conn.release();
                console.error("Error starting transaction: ", err);
                return res.status(500).json({ message: "Internal Server Error" });
            }

            if (updateFields.length > 0) {
                const updateProductSql = `UPDATE products SET ${updateFields.join(", ")} WHERE id = ?;`;

                conn.query(updateProductSql, updateValues, (err, results) => {
                    if (err) {
                        return conn.rollback(() => {
                            conn.release();
                            console.error("Error updating product: ", err);
                            res.status(500).json({ message: "Internal Server Error" });
                        });
                    }
                    if (results.affectedRows === 0) {
                        return conn.rollback(() => {
                            conn.release();
                            res.status(404).json({ message: "Product not found" });
                        });
                    }

                    handleImages(conn);
                });
            } else {
                handleImages(conn);
            }
        });

        function handleImages(conn) {
            if (!images || images.length === 0) {
                return deleteAllImages(conn);
            }

            const fetchExistingImagesSql = `SELECT image_url FROM product_images WHERE product_id = ?;`;
            conn.query(fetchExistingImagesSql, [productId], (err, results) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release();
                        console.error("Error fetching existing images: ", err);
                        res.status(500).json({ message: "Internal Server Error" });
                    });
                }

                const existingImages = new Set(results.map(row => row.image_url));
                const newImages = new Set(images);

                const imagesToRemove = [...existingImages].filter(img => !newImages.has(img));
                const imagesToInsert = [...newImages].filter(img => !existingImages.has(img));

                if (imagesToRemove.length > 0) {
                    deleteImages(conn, imagesToRemove, () => insertNewImages(conn, imagesToInsert));
                } else {
                    insertNewImages(conn, imagesToInsert);
                }
            });
        }

        function deleteAllImages(conn) {
            const deleteImagesSql = `DELETE FROM product_images WHERE product_id = ?;`;
            conn.query(deleteImagesSql, [productId], (err) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release();
                        console.error("Error deleting images: ", err);
                        res.status(500).json({ message: "Internal Server Error" });
                    });
                }
                commitTransaction(conn, "Product updated successfully (all images removed)");
            });
        }

        function deleteImages(conn, imagesToRemove, callback) {
            const deleteImagesSql = `DELETE FROM product_images WHERE product_id = ? AND image_url IN (?);`;
            conn.query(deleteImagesSql, [productId, imagesToRemove], (err) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release();
                        console.error("Error deleting images: ", err);
                        res.status(500).json({ message: "Internal Server Error" });
                    });
                }
                callback();
            });
        }

        function insertNewImages(conn, imagesToInsert) {
            if (imagesToInsert.length === 0) {
                return commitTransaction(conn, "Product updated successfully (no new images)");
            }

            const insertImagesSql = `INSERT INTO product_images (product_id, image_url) VALUES ?;`;
            const imageValues = imagesToInsert.map(imageUrl => [productId, imageUrl]);

            conn.query(insertImagesSql, [imageValues], (err) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release();
                        console.error("Error inserting images: ", err);
                        res.status(500).json({ message: "Internal Server Error" });
                    });
                }

                commitTransaction(conn, "Product and images updated successfully");
            });
        }

        function commitTransaction(conn, message) {
            conn.commit((err) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release();
                        console.error("Error committing transaction: ", err);
                        res.status(500).json({ message: "Internal Server Error" });
                    });
                }
                conn.release();
                res.json({ message });
            });
        }
    });
});



app.get('/productDetails', (req, res) => {
    const productId = req.query.id;

    const sql = `
        SELECT 
            p.id, 
            p.name, 
            p.price, 
            p.discount,
            p.description, 
            p.quantity, 
            GROUP_CONCAT(pi.image_url) AS images 
        FROM 
            products p
        LEFT JOIN 
            product_images pi 
        ON 
            p.id = pi.product_id
        WHERE 
            p.id = ?
        GROUP BY 
            p.id;
    `;

    connection.query(sql, [productId], (err, results) => {
        if (err) {
            console.error("Error fetching product details: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (results.length > 0) {
            const product = results[0];
            product.images = product.images ? product.images.split(',') : [];
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    });
});

app.get('/productTypes', (req, res) => {  // ✅ Corrected order
    const sql = `SELECT * FROM product_types;`;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching all Product Types: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);  // ✅ No need for Object.values()
    });
});




// ---------------- ORDERS ---------------------

app.get("/orders/:order_id", (req, res) => {
    const orderId = req.params.order_id;
    const sql = `
    SELECT 
        o.id AS order_id,
        o.user_name,
        o.user_email,
        o.user_phone,
        o.user_address,
        o.order_date,
        o.status,
        oi.product_id,
        p.name AS product_name,
        oi.quantity,
        p.price
    FROM 
        orders o
    JOIN 
        order_items oi ON o.id = oi.order_id
    JOIN 
        products p ON oi.product_id = p.id
    WHERE 
             o.id = ?;
    `;

    connection.query(sql, [orderId], (err, results) => {
        if (err) {
            console.error("Error fetching orders: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results)
    })
})


app.get("/orders", (req, res) => {
    const sql = `
        SELECT 
        o.id AS order_id,
        o.user_name,
        o.user_email,
        o.user_phone,
        o.user_address,
        o.order_date,
        o.status,
        oi.product_id,
        p.name AS product_name,
        oi.quantity,
        p.price,
        (SELECT pi.image_url 
        FROM product_images pi 
        WHERE pi.product_id = p.id 
        ORDER BY pi.id ASC 
        LIMIT 1) AS product_image -- Get the first image for each product
    FROM 
        orders o
    JOIN 
        order_items oi ON o.id = oi.order_id
    JOIN 
        products p ON oi.product_id = p.id
    ORDER BY 
        o.order_date DESC;  -- This ensures newest orders come first
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching all orders: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Group order items by order ID
        const orders = results.reduce((acc, row) => {
            if (!acc[row.order_id]) {
                acc[row.order_id] = {
                    order_id: row.order_id,
                    user_name: row.user_name,
                    user_email: row.user_email,
                    user_phone: row.user_phone,
                    user_address: row.user_address,
                    order_date: row.order_date,
                    status: row.status,
                    items: []
                };
            }

            if (row.product_id) {
                acc[row.order_id].items.push({
                    product_id: row.product_id,
                    product_name: row.product_name,
                    image: row.product_image,
                    quantity: row.quantity,
                    price: row.price
                });
            }

            return acc;
        }, {});

        res.json(Object.values(orders));
    });
});

app.get("/orderTotal", (req, res) => {
    const sql = "SELECT COUNT(*) AS order_count FROM orders;";

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching order count, ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        // Send the order count as a response
        res.json({ order_count: results[0].order_count });
    });
});

app.get("/ordersCount", (req, res) => {

    const sql = `
       SELECT 
            status, 
            COUNT(*) AS status_count
        FROM 
            orders
        WHERE 
            status IN ('Delivered', 'Pending', 'Cancelled', 'In Progress')
        GROUP BY 
            status; 
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching all orders: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        const statusData = {
            labels: [],
            data: []
        };

        results.forEach(row => {
            statusData.labels.push(row.status);
            statusData.data.push(row.status_count);
        });
        res.json(statusData);

    });

});

app.get("/pendingOrdersCount", (req, res) => {
    const sql = `
        SELECT 
            COUNT(*) AS pending_count
        FROM 
            orders
        WHERE 
            status = 'Pending';
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching pending orders count: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        const pendingCount = results[0].pending_count;
        res.json({ pendingCount });
    });
});


app.get("/getLatestOrders", (req, res) => {
    const sql = `
        SELECT 
            o.id AS order_id, 
            o.user_name, 
            o.user_email, 
            o.user_phone, 
            o.user_address, 
            o.order_date, 
            o.status, 
            SUM(oi.quantity * p.price) AS total_amount
        FROM 
            orders o
        JOIN 
            order_items oi ON o.id = oi.order_id
        JOIN 
            products p ON oi.product_id = p.id
        GROUP BY 
            o.id, o.user_name, o.user_email, o.user_phone, o.user_address, o.order_date, o.status
        ORDER BY 
            o.order_date DESC
        LIMIT 6;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching latest orders: ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);  // Sending total_amount in the response
    });
});

app.put("/updateOrderStatus", (req, res) => {
    const { orderId, newStatus } = req.body;

    if (!orderId || !newStatus) {
        return res.status(400).json({ error: "Missing orderId or newStatus" });
    }

    const sql = "UPDATE orders SET status = ? WHERE id = ?";

    connection.query(sql, [newStatus, orderId], (err, result) => {
        if (err) {
            console.error("Error updating order status:", err);
            return res.status(500).json({ error: "Failed to update order status" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order status updated successfully" });
    })
})

// Route to add an order with order items
app.post("/add-order", (req, res) => {
    const { user_name, user_email, user_phone, user_address, order_date, status, items } = req.body;

    if (!user_name || !user_email || !user_phone || !user_address || !status || !items || !Array.isArray(items)) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    const insertOrderQuery = `INSERT INTO orders (user_name, user_email, user_phone, user_address, order_date, status) VALUES (?, ?, ?, ?, NOW(), ?)`;

    connection.query(insertOrderQuery, [user_name, user_email, user_phone, user_address, status], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error inserting order", error: err });
        }

        const orderId = result.insertId;

        if (items.length === 0) {
            return res.status(201).json({ message: "Order added successfully", orderId });
        }

        const insertItemsQuery = `INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`;
        const orderItemsData = items.map(item => [orderId, item.product_id, item.quantity]);

        connection.query(insertItemsQuery, [orderItemsData], (err) => {
            if (err) {
                return res.status(500).json({ message: "Error inserting order items", error: err });
            }
            res.status(201).json({ message: "Order and items added successfully", orderId });
        });
    });
});




// ---------------------- Cutsomers -----------------

app.get("/customers", (req, res) => {
    const sql = `
                WITH CustomerTotals AS (
            SELECT 
                o.user_name,
                o.user_email,
                o.user_phone,
                SUM(oi.quantity * p.price) AS Total_Purchase_Amount
            FROM 
                orders o
            JOIN 
                order_items oi ON o.id = oi.order_id
            JOIN 
                products p ON oi.product_id = p.id
            GROUP BY 
                o.user_name, o.user_email, o.user_phone
        ),
        PercentileRanks AS (
            SELECT 
                user_name,
                user_email,
                user_phone,
                Total_Purchase_Amount,
                -- Calculate percentile rank (0 to 1)
                PERCENT_RANK() OVER (ORDER BY Total_Purchase_Amount DESC) AS Percentile
            FROM 
                CustomerTotals
        )
        SELECT 
            user_name AS Name,
            user_email AS Email,
            user_phone AS Phone,
            Total_Purchase_Amount,
            CASE
                WHEN Percentile <= 0.05 THEN 'Diamond'
                WHEN Percentile <= 0.20 THEN 'Platinum'
                WHEN Percentile <= 0.50 THEN 'Gold'
                WHEN Percentile <= 0.80 THEN 'Silver'
                ELSE 'Bronze'
            END AS Customer_Tier
        FROM 
            PercentileRanks
        ORDER BY 
            Total_Purchase_Amount DESC;
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.log("Error Fetching customers ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);
    })
})


// =================== 🏁🏁🏁 Section Customer Finished 🏁🏁🏁 =================== \\
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
//🔲
// =================== 🚀🚀🚀 Ads Section Start 🚀🚀🚀 =================== \\

app.get('/ads', (req, res) => {
    const sql = `
        SELECT id, image_url, url_link FROM ads WHERE ad_type = "big";
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.log("Error Fetching Ads ", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);
    });
});


app.put('/ads/:id', (req, res) => {
    const adId = req.params.id; // Get ad ID from the URL
    const { url_link } = req.body; // Get new URL from the request body

    console.log("Received Update Request for Ad ID:", adId);
    console.log("New URL Link:", url_link);

    if (!url_link) {
        return res.status(400).json({ message: "url_link is required" });
    }

    const sql = `UPDATE ads SET url_link = ? WHERE id = ?`;

    connection.query(sql, [url_link, adId], (err, result) => {
        if (err) {
            console.error("Error updating ad URL:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        console.log("SQL Update Result:", result);

        if (result.affectedRows === 0) {
            console.log("No ad found with ID:", adId);
            return res.status(404).json({ message: "Ad not found" });
        }

        res.json({ message: "Ad URL updated successfully" });
    });
});


app.get('/bannerAds', (req, res) => {
    const sql = `
        SELECT id, image_url,url_link FROM ads WHERE ad_type = "banner";
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.log("Error Fetching Ads", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);
    });
});


app.post('/update-banner-image', (req, res) => {
    const { bannerId, newImageUrl } = req.body;

    console.log("Received data:", req.body);  // Debugging line

    // Validate inputs
    if (!bannerId || !newImageUrl) {
        return res.status(400).json({ error: 'Missing banner ID or image URL' });
    }

    // Query to update the image URL in the database
    const updateQuery = 'UPDATE ads SET image_url = ? WHERE id = ?';

    connection.query(updateQuery, [newImageUrl, bannerId], (err, result) => {
        if (err) {
            console.error('Error updating banner image:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Success
        res.json({ message: 'Banner image updated successfully' });
    });
});


app.get('/cardAds', (req, res) => {
    const sql = `
        SELECT id, image_url FROM ads WHERE ad_type = "card";
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.log("Error Fetching Ads", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.json(results);
    });
});

app.post('/update-card-image', (req, res) => {
    const { bannerId, newImageUrl } = req.body;

    // Validate inputs
    if (!bannerId || !newImageUrl) {
        return res.status(400).json({ error: 'Missing banner ID or image URL' });
    }

    // Query to update the image URL in the database
    const updateQuery = 'UPDATE ads SET image_url = ? WHERE id = ?';

    connection.query(updateQuery, [newImageUrl, bannerId], (err, result) => {
        if (err) {
            console.error('Error updating banner image:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Success
        res.json({ message: 'Banner image updated successfully' });
    });
});

app.get('/ads/category-images', (req, res) => {
    const sql = `
        SELECT image_url, url_link FROM ads WHERE ad_type = "card" LIMIT 2; 
    `;
    connection.query(sql, (err, results) => {
        if (err) {
            console.log("Error fetching category images:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        res.json(results);  // Send images data to the frontend
    });
});


//-===============================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
