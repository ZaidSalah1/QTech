-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2025 at 05:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce store`
--

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `ad_type` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `url_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `image_url`, `ad_type`, `created_at`, `url_link`) VALUES
(4, 'http://localhost:1001/uploads/ads/slider-01.jpg\r\n', 'big', '2025-02-17 14:03:39', 'http://localhost:1001/all_product.html'),
(5, 'http://localhost:1001/uploads/ads/slider-06.png\r\n', 'big', '2025-02-17 14:03:39', 'http://localhost:1001/all_product.html'),
(22, 'http://localhost:1001/uploads/ads/1740501882655-banner-12.png', 'banner', '2025-02-18 07:26:08', 'kos'),
(23, 'http://localhost:1001/uploads/ads/1740502050533-banner-4.jpg', 'banner', '2025-02-18 07:26:08', 'zft'),
(25, 'http://localhost:1001/uploads/ads/1741415896712-keyboard-banner.png', 'card', '2025-02-19 11:02:30', 'http://localhost:1001/product_type.html?type_id=9'),
(26, 'http://localhost:1001/uploads/ads/1741416128927-47c44fe1-1a0c-428b-beb4-24142d39773f.jpg', 'card', '2025-02-19 11:02:30', 'http://localhost:1001/product_type.html?type_id=12'),
(33, 'http://localhost:1001/uploads/ads/1741415233143-ramadan_banner_ai.png', 'big', '2025-03-08 06:27:13', 'http://localhost:1001/all_product.html'),
(34, 'http://localhost:1001/uploads/ads/1741415373645-asus-dominate-banner-900x450-ai.png', 'big', '2025-03-08 06:29:33', 'http://localhost:1001/all_product.html');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_phone` varchar(20) NOT NULL,
  `user_address` text NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_name`, `user_email`, `user_phone`, `user_address`, `order_date`, `status`) VALUES
(1, 'zaid salah', 'zaid5215@gmail.com', '+9876543210', 'Ramallah - Al-birah', '2025-02-02 22:13:40', 'Delivered'),
(2, 'khalid', 'khalid najjar', '05534809', 'Al-Quds', '2025-02-02 23:17:23', 'Pending'),
(3, 'salah', 'salah@gmail.com', '67532454', 'ramallah', '2025-02-03 16:19:18', 'Cancelled'),
(4, 'Layla Ahmad', 'layla.ahmad@example.com', '0591122334', 'Bethlehem', '2025-02-03 20:45:30', 'In Progress'),
(5, 'Yousef Nasser', 'yousef.nasser@example.com', '+972599887766', 'Jenin', '2025-02-03 21:10:15', 'In Progress'),
(6, 'Rania Samir', 'rania.samir@example.com', '0567788990', 'Tulkarm', '2025-02-03 21:50:00', 'Pending'),
(7, 'Mohammed Saeed', 'mohammed.saeed@example.com', '+972542233445', 'Ramallah', '2025-02-03 22:25:40', 'Cancelled'),
(8, 'Nour Hamed', 'nour.hamed@example.com', '0593344556', 'Al-Khalil', '2025-02-03 23:05:20', 'Pending'),
(9, 'Hassan Jaber', 'hassan.jaber@example.com', '+972532211009', 'Nablus', '2025-02-04 00:15:55', 'Cancelled'),
(10, 'Samar Fathi', 'samar.fathi@example.com', '0566677889', 'Qalqilya', '2025-02-04 01:30:10', 'Pending'),
(11, 'Omar Tarek', 'omar.tarek@example.com', '+972544556677', 'Gaza', '2025-02-04 02:00:45', 'Delivered'),
(12, 'Hiba Adel', 'hiba.adel@example.com', '0594455667', 'Jenin', '2025-02-04 03:20:30', 'Delivered'),
(13, 'Amal Zain', 'amal.zain@example.com', '+972577889900', 'Hebron', '2025-02-04 04:10:05', 'Delivered'),
(14, 'Ahmed Ali', 'ahmed.ali@example.com', '+972567890123', 'Nablus', '2025-02-03 21:42:10', 'Cancelled'),
(15, 'Fatima Hasan', 'fatima.hasan@example.com', '0598765432', 'Hebron', '2025-02-03 21:42:10', 'Delivered'),
(16, 'Omar Khaled', 'omar.khaled@example.com', '+972541234567', 'Jericho', '2025-02-03 21:42:10', 'Delivered'),
(37, 'zaid dsdsdsds', 'zaidsalah-2013@hotmail.com', '312', 'zft', '2025-02-10 01:43:26', 'Cancelled'),
(38, 'Ala Hamed', 'ala431@gmail.com', '028954894', 'Egypt', '2025-02-10 02:03:17', 'Delivered'),
(39, 'omar ahmad', 'omar576@gamil.com', '058675834', 'Ramallah', '2025-02-16 06:29:41', 'Pending'),
(58, 'Saeed Jraba', 'saeed871@gmail.com', '058650932', 'Biten', '2025-02-21 18:07:10', 'Delivered'),
(62, 'Osaid Hamayel', 'osaid934@gmail.com', '05978534', 'Nablus - Al-Shuhada Street, Building 8', '2025-03-08 11:00:01', 'In Progress'),
(63, 'Layla  Hamdan', 'sammer542@gmail.com', '059846509', 'Hebron - Salah Al-Din Street, Apartment 15', '2025-03-08 11:01:51', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`) VALUES
(3, 1, 5, 2),
(4, 1, 9, 3),
(6, 3, 6, 1),
(7, 13, 37, 1),
(8, 13, 7, 1),
(9, 9, 12, 1),
(10, 11, 13, 2),
(12, 4, 5, 1),
(13, 4, 6, 3),
(14, 5, 7, 1),
(15, 5, 8, 2),
(16, 5, 9, 1),
(17, 6, 10, 2),
(18, 6, 11, 1),
(19, 6, 12, 3),
(20, 7, 13, 1),
(21, 7, 18, 2),
(22, 7, 20, 1),
(23, 8, 23, 2),
(24, 8, 28, 1),
(26, 9, 30, 1),
(27, 9, 37, 2),
(29, 10, 5, 2),
(30, 10, 6, 1),
(31, 10, 7, 3),
(32, 11, 8, 1),
(33, 11, 9, 2),
(34, 11, 10, 1),
(35, 12, 11, 2),
(36, 12, 12, 1),
(37, 12, 13, 3),
(38, 13, 18, 1),
(39, 13, 20, 2),
(40, 13, 23, 1),
(41, 14, 28, 2),
(43, 14, 30, 3),
(44, 15, 37, 1),
(46, 15, 5, 1),
(47, 16, 6, 2),
(48, 16, 7, 1),
(49, 16, 8, 3),
(57, 37, 54, 2),
(58, 38, 53, 1),
(59, 38, 59, 3),
(60, 38, 50, 3),
(80, 58, 118, 1),
(89, 62, 166, 1),
(90, 63, 152, 1),
(91, 63, 164, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `type_id` int(11) DEFAULT NULL,
  `sales_count` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `discount` int(11) DEFAULT NULL,
  `main_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `quantity`, `type_id`, `sales_count`, `created_at`, `discount`, `main_img`) VALUES
(5, 'MONITOR ASUS TUF VG27WQ 27″ WQHD CURVED VA 165HZ', '1550', '', 0, 8, 0, '2025-01-30 15:01:08', 1000, 'http://localhost:1001/uploads/1738453040244-1734029854_1_1734029854_qxasHgT0vw.jpg'),
(6, 'GPU ASUS TUF RTX4060TI-O8G-GAMING', '2149', 'ASUS TUF Gaming GeForce RTX™ 4060 Ti 8GB GDDR6 OC Edition with DLSS 3, lower temps, and enhanced durability', 6, 2, 32, '2025-01-30 15:01:08', 0, 'https://watanimall.com/wp-content/uploads/2023/03/CL-LC-II-360-B-2.png'),
(7, 'KEYBOARD ASUS XA05 ROG STRIX SCOPE RX RGB RED', '340', '', 3, 9, 0, '2025-01-30 15:01:08', 0, 'http://localhost:1001/uploads/1738453040244-1734029854_1_1734029854_qxasHgT0vw.jpg'),
(8, 'COOLER FAN-CASE CORSAIR ML120 PRO RGB 3-FAN BLACK', '480', 'COOLER FAN-CASE CORSAIR ML120 PRO RGB 3-FAN BLACK', 4, 7, 0, '2025-01-30 15:01:08', 420, 'http://localhost:1001/uploads/1738453040244-1734029854_1_1734029854_qxasHgT0vw.jpg'),
(9, 'LAPTOP ACER NITRO 5 17.3″ i5-12500H SSD1TB RAM32 3060 DOS', '4350', 'undefined', 9, 15, 0, '2025-01-30 18:54:46', 0, 'http://localhost:1001/uploads/1738451971692-1735750597_1_1735750597_UU5p9Sm8Wt.jpg'),
(10, 'Gigabyte AORUS GeForce RTX 3070 Ti MASTER 8GB Graphics Card', '2699', 'Gigabyte AORUS GeForce RTX 3070 Ti MASTER 8GB Graphics Card', 0, 2, 0, '2025-01-30 18:54:46', 0, NULL),
(11, 'CASE NZXT H710I RGB TG MID TOWER MATTE BLACK / RED', '650', 'CASE NZXT H710I RGB TG MID TOWER MATTE BLACK / RED', 12, 8, 0, '2025-01-30 18:54:46', 0, NULL),
(12, 'Acer Predator XB253QGW 25 Gaming Monitor', '2400', '25Inch, FHD, IPS, 0.5ms, 280Hz, Nvidia G-Sync', 5, 8, 0, '2025-01-30 18:54:46', 0, NULL),
(13, 'HEADSET HYPERX CLOUD ALPHA PRO RED GAMING', '349', 'HEADSET HYPERX CLOUD ALPHA PRO RED GAMING', 0, 11, 0, '2025-01-30 18:54:46', 299, NULL),
(18, 'MONITOR MSI ESPORTS G244F E2 24″ FHD IPS 180HZ', '980', 'MONITOR MSI ESPORTS G244F E2 24″ FHD IPS 180HZ', 3, 8, 0, '2025-01-30 20:09:20', 0, NULL),
(20, 'GPU ASUS DUAL RTX4060TI-O8G-GAMING WHITE', '1700', 'GPU ASUS DUAL RTX4060TI-O8G-GAMING WHITE', 8, 2, 0, '2025-01-30 20:30:52', 1000, NULL),
(23, 'MONITOR ASUS ROG STRIX XG27ACG 27” WQHD IPS 180HZ', '1800', 'MONITOR ASUS ROG STRIX XG27ACG 27” WQHD IPS 180HZ', 0, 8, 0, '2025-02-01 00:01:39', 0, NULL),
(28, 'GPU GIGABYTE GEFORCE RTX4070 SUPER GAMING OC 12G', '3200', 'GPU GIGABYTE GEFORCE RTX4070 SUPER GAMING OC 12G', 0, 2, 0, '2025-02-01 00:57:53', 0, NULL),
(30, 'Razer BlackShark V2 X Wired Console Headset for Xbox', '299', 'Razer BlackShark V2 X Wired Console Headset for Xbox', 249, 11, 0, '2025-02-01 23:19:31', 0, NULL),
(37, 'COOLER LIQUID-CPU CORSAIR H150 RGB BLACK', '450', 'COOLER LIQUID-CPU CORSAIR H150 RGB BLACK', 3, 7, 0, '2025-02-03 20:07:51', 0, NULL),
(38, 'PSU ASUS ROG THOR 850P 850W 80+ PLATINUM', '790', 'PSU ASUS ROG THOR 850P 850W 80+ PLATINUM', 3, 6, 0, '2025-02-06 22:20:26', 749, NULL),
(39, 'PSU ASUS ROG LOKI 750W SFX-L 80+ PLATINIUM', '820', 'PSU ASUS ROG LOKI 750W SFX-L 80+ PLATINIUM', 3, 6, 0, '2025-02-06 22:22:24', 0, NULL),
(46, 'CHAIR DXRACER P132 GAMING BLACK RED', '870', 'CHAIR DXRACER P132 GAMING BLACK RED', 2, 14, 0, '2025-02-06 23:00:18', 0, NULL),
(50, 'Aorus M6 Wireless Gaming Mouse', '519', 'Aorus M6 Wireless Gaming Mouse', 3, 10, 0, '2025-02-07 00:46:13', 479, NULL),
(53, 'KTC H27T22S 27, QHD, IPS, 180Hz, 1ms Gaming Monitor', '1349', 'KTC H27T22S 27, QHD, IPS, 180Hz, 1ms Gaming Monitor\n', 1, NULL, 0, '2025-02-09 01:19:11', 1000, NULL),
(54, 'GIGABYTE MO34WQC 34, WQHD, OLED, 175Hz, 0.03ms Gaming Monitor', '3569', 'GIGABYTE MO34WQC 34, WQHD, OLED, 175Hz, 0.03ms Gaming Monitor\n', 2, 8, 0, '2025-02-09 01:21:48', 0, NULL),
(57, 'Cooler Master GM27-CQS 27, QHD, VA, 165Hz, 0.5ms Curved Gaming Monitor', '1149', 'Cooler Master GM27-CQS 27, QHD, VA, 165Hz, 0.5ms Curved Gaming Monitor\n', 2, 8, 0, '2025-02-09 01:51:20', 0, NULL),
(59, 'TRYX PANORAMA ARGB 360 3D LCD CPU Liquid Cooler', '2499', 'TRYX PANORAMA ARGB 360 3D LCD CPU Liquid Cooler\n', 3, 7, 0, '2025-02-09 02:13:36', 0, NULL),
(60, 'Corsair VOID RGB ELITE USB 7.1 Surround Sound Gaming Headset', '490', 'Headphone Model : VOID ELITE USB\nHeadphone Interface : USB\nAudio Compatibility : PC\nHeadphone Frequency Response : 20Hz - 30 kHz\nHeadphone Sensitivity : 116dB (+/-3dB)\nHeadphone Type : Wired USB\nHeadphone Drivers : 50mm\nImpedance : 32k Ohms @ 1 kHz\nAudio : 7.1 Surround\nLighting : Yes\nPlatform : PC\nMemory Type : USB\nMicrophone Type : Omni-directional\nMicrophone Impedance : 2.0k Ohms\nMicrophone Frequency Response : 100Hz to 10kHz\nMicrophone Sensitivity : -42dB (+/-3dB)\nSurround Sound : Yes\nCable Length : 1.8m\nDetachable Microphone : No\n', 3, 11, 0, '2025-02-14 13:03:57', 0, NULL),
(63, 'ASUS TUF Gaming GeForce RTX 4070 Ti SUPER 16GB OC Edition Video Card', '4249', 'ASUS TUF Gaming GeForce RTX™ 4070 Ti SUPER 16GB GDDR6X OC Edition with DLSS 3, lower temps, and enhanced durability\nAI Performance: 714 AI TOPS\nPowered by NVIDIA DLSS3, ultra-efficient Ada Lovelace arch, and full ray tracing.\n4th Generation Tensor Cores: Up to 4x performance with DLSS 3 vs. brute-force rendering\n3rd Generation RT Cores: Up to 2X ray tracing performance\nOC mode: 2670 MHz (OC mode)/ 2640 MHz (Default mode)\nAxial-tech fans scaled up for 21% more airflow\nDual ball fan bearings last up to twice as long as conventional designs\nMilitary-grade capacitors rated for 20K hours at 105C make the GPU power rail more durable\nMetal exoskeleton adds structural rigidity and vents to increase heat reliability\nAuto-Extreme precision automated manufacturing for higher reliability\nGPU Tweak III software provides intuitive performance tweaking, thermal controls, and system monitoring', 3, 2, 0, '2025-02-14 14:47:22', 0, NULL),
(76, 'KOORUI GN10 27, QHD, VA MINI LED, 240Hz, 1ms Gaming Monitor', '1877', 'KOORUI GN10 27, QHD, VA MINI LED, 240Hz, 1ms Gaming Monitor\n', 2, 8, 0, '2025-02-19 07:56:42', 0, NULL),
(77, 'MSI Thin 15 B12UCX i5-12450H, 16GB RAM, 512GB NVMe, RTX 2050 4GB Laptop', '2999', 'MSI Thin 15 B12UCX i5-12450H, 16GB RAM, 512GB NVMe, RTX 2050 4GB Laptop\n', 3, 15, 0, '2025-02-19 15:15:13', 2899, NULL),
(78, 'RAZER BLACKWIDOW V3 TENKEYLESS Mechanical Gaming Keyboard - Green Switch', '479', 'RAZER BLACKWIDOW V3 TENKEYLESS Mechanical Gaming Keyboard - Green Switch\n', 0, 9, 0, '2025-02-19 15:35:25', 379, NULL),
(99, 'GAMING DESK table GAMEON L-SHAPED SLAYER I WITH ACCESSORIES STAND', '600', 'GAMING DESK GAMEON L-SHAPED SLAYER I WITH ACCESSORIES STAND\n', 3, 16, 0, '2025-02-20 09:18:34', 0, NULL),
(100, 'CASE LIAN-LI PC-O11 DYNAMIC TG FULL TOWER WHITE', '770', 'CASE LIAN-LI PC-O11 DYNAMIC TG FULL TOWER WHITE\n', 5, 12, 0, '2025-02-20 09:21:58', 670, NULL),
(102, 'CASE COOLERMASTER TD500 CRYSTAL ARGB TG MID TOWER BLACK', '440', 'CASE COOLERMASTER TD500 CRYSTAL ARGB TG MID TOWER BLACK\n', 4, 12, 0, '2025-02-20 09:33:21', 399, NULL),
(103, 'RAM ADATA XPG SPECTRIX D60G 4133 2X8GB RGB G19J', '420', 'RAM ADATA XPG SPECTRIX D60G 4133 2X8GB RGB G19J\n', 2, 4, 0, '2025-02-20 09:37:38', 390, NULL),
(104, 'MONITOR AOC AG251FZ2E 24.5” TN 240HZ', '1470', 'MONITOR SIZE IN INCHES: 25\"\n\nRESOLUTION: 1920X1080\n\nFEATURES: FLAT\n\nPANEL TYPE: TN\n\nFREQUENCY IN HERTZ: 240', 2, 8, 0, '2025-02-20 09:41:05', 0, NULL),
(105, 'MB GIGABYTE B560 AOURS PRO AX INTEL LGA12', '750', 'MB GIGABYTE B560 AOURS PRO AX INTEL LGA12\n', 1, 3, 0, '2025-02-20 09:52:29', 0, NULL),
(106, 'CHAIR DXRACER PRINCE L Black & Blue PVC Leather', '950', 'Chair type:	Gaming, Office\nUpholstery material:	Premium PU-leather\nFoam type:	High density mold shaping foam\nArmrests:	1-directional\nFrame construction:	Steel\nTilt function:	Full tilt\nTilt angle lock:	No\nHydraulics gas piston:	Class 4\nBase:	Premium nylon\nCasters:	2.36 inches / 6 cm PU-coated\nHead cushion:	Yes\nLumbar cushion:	Yes\nColour:	Black, Blue', 3, 14, 0, '2025-02-20 10:45:12', 900, NULL),
(107, 'Be Quiet! LIGHT WINGS LX 120mm PWM - 3 Pack Black', '379', 'Be Quiet! LIGHT WINGS LX 120mm PWM - 3 Pack Black', 3, 7, 0, '2025-02-20 10:47:47', 339, NULL),
(108, 'VALKYRIE A360 ARGB Liquid CPU Cooler - White', '799', 'Feature	:\nPre-Install Cooling Fan\nPre-Applied Thermal Paste\n280W TDP\n360 Rotation Pump Logo\n\n', 2, 7, 0, '2025-02-20 10:49:48', 0, NULL),
(109, 'VALKYRIE V360 DRACULA Super Premium CPU Liquid Cooler - Black', '1899', 'VALKYRIE V360 DRACULA Super Premium CPU Liquid Cooler - Black\n', 1, 7, 0, '2025-02-20 10:51:30', 0, NULL),
(110, 'LOVINGCOOL LD-120 5V ARGB fan - Black - 3 Pack', '199', 'LOVINGCOOL LD-120 5V ARGB fan - Black - 3 Pack\n', 1, 7, 0, '2025-02-20 10:53:27', 0, NULL),
(111, 'GIGABYTE AORUS Gen5 14000 1TB M.2 NVMe', '799', 'Interface: PCI-Express 5.0 NVMe \n\nSequential read/write: 13,600/10,200MB/s\n\nExternal DDR Cache: LPDDR4 2GB NAND\n\n3D TLC NAND Flash', 7, 5, 0, '2025-02-20 10:56:44', 699, NULL),
(113, 'SteelSeries Arctis Pro 7.1 Gaming Headset', '879', 'SteelSeries Arctis Pro 7.1 Gaming Headset\n', 2, 11, 0, '2025-02-20 11:01:26', 0, NULL),
(114, 'MSI Radeon RX 6800 GAMING X TRIO 16GB Graphics Card', '2799', 'MSI Radeon RX 6800 GAMING X TRIO 16GB Graphics Card\n', 1, 2, 0, '2025-02-20 11:05:58', 0, NULL),
(116, 'Gigabyte X870 AORUS ELITE WIFI7 Motherboard', '1799', 'AMD Socket AM5：Supports AMD Ryzen™ 9000 / 8000 / 7000 Series Processors\n\nDigital twin 16+2+2 phases VRM solution\n\nDual Channel DDR5：4*DIMMs with AMD EXPO™Memory Module Support\n\nWIFI EZ-Plug: Quick and easy design for Wi-Fi antenna installation\n\nEZ-Latch Plus：PCIe and M.2 slots with Quick Release & Screwless Design\n\nEZ-Latch Click：M.2 heatsinks with screwless design\n\nSensor Panel Link：Onboard video port for hassle-free in-chassis panel setup\n\nFriendly UI: Multi-Theme, AIO Fan Control, and Q-Flash Auto Scan in BIOS and SW\n\nUltra-Fast Storage：4*M.2 slots, including 3* PCIe 5.0 x4\n\nEfficient Thermal：VRM Thermal Armor Advanced & M.2 Thermal Guard L\n\nFast Networking：2.5GbE LAN & Wi-Fi 7 with directional Ultra-high gain antenna\n\nExtended Connectivity：Dual USB4 Type-C with DP-Alt, HDMI\n\nReliable Audio：Realtek ALC1220 HD Audio & Audiophile Grade Capacitors\n\nUltra Durable PCIe Armor : The metal back plate of PCIe x16 slot for enhanced durability\n\nPCIe UD Slot X： PCIe 5.0 x16 slot with 10X strength for graphics card', 3, 3, 0, '2025-02-20 18:58:59', 1699, NULL),
(117, 'GAMING DESK table ACER PREDATOR BLUE 140X60 120KG', '950', '• Full-surface Mouse Pad at 140x60x0.2 cm\n• Carbon-fiber Surface, T-Shaped Steel Structure\n• Includes Rack, Headphone Hook, Cup Holder\n• Two Cable Management Cutouts', 2, 16, 0, '2025-02-21 10:53:49', 750, NULL),
(118, 'GAMING DESK table TWISTED MINDS WARRIOR L SHAPED RGB RIGHT WHITE', '850', 'GAMING DESK TWISTED MINDS WARRIOR L SHAPED RGB RIGHT WHITE\n', 4, 16, 0, '2025-02-21 12:38:28', 0, NULL),
(119, 'LAPTOP LENOVO LOQ 15.6″ i7-13620H SSD512 RAM16 RTX4060 DOS', '4999', 'MONITOR IN INCHES	15.6\"\n\nCPU I7-13620H\n\nSTORAGE SSD-512GB\n\nMEMORY SIZE 8GB+8GB DDR5\n\nRSOLUTION 1920X1080\n\nMONTIORS HZ 144HZ\n\nOPERATING SYSTEM DOS\n\nLAPTOP TYPE	NORMAL\n\nGPU RTX4060', 9, 15, 0, '2025-02-21 12:40:55', 0, NULL),
(120, 'CPU INTEL I7 14700K BOX', '1650', 'CPU INTEL I7 14700K BOX', 4, 1, 0, '2025-02-21 19:15:09', 0, NULL),
(121, 'CPU AMD RYZEN 9 7900X BOX', '1799', 'CPU AMD RYZEN 9 7900X BOX\n', 6, 1, 0, '2025-02-21 19:15:58', 1700, NULL),
(122, 'RAM ADATA XPG SPECTRIX D50 3200 2X8GB GREY G16A', '390', 'RAM ADATA XPG SPECTRIX D50 3200 2X8GB GREY G16A', 3, 4, 0, '2025-02-21 19:17:46', 0, NULL),
(123, 'KEYBOARD LOGITECH G413 TKL SE MECHANICAL GAMING US INT’L', '275', 'KEYBOARD LOGITECH G413 TKL SE MECHANICAL GAMING US INT’L\n', 2, 9, 0, '2025-02-21 19:20:51', 0, NULL),
(124, 'KEYBOARD ROCCAT VULCAN TKL RGB MECH LINEAR S-RED BLACK', '350', 'KEYBOARD ROCCAT VULCAN TKL RGB MECH LINEAR S-RED BLACK\n', 1, 9, 0, '2025-02-21 19:22:36', 0, NULL),
(125, 'MOUSEPAD GLORIOUS 3XL EXTENDED STEALTH 24X48 (1219mmX610mm)', '250', 'MOUSEPAD GLORIOUS 3XL EXTENDED STEALTH 24X48 (1219mmX610mm)\n', 3, 10, 0, '2025-02-22 16:45:01', 0, NULL),
(126, 'MOUSE GLORIOUS MODEL O MINUS MATTE BLACK', '250', 'MOUSE GLORIOUS MODEL O MINUS MATTE BLACK\n', 8, 10, 0, '2025-02-22 18:03:02', 220, NULL),
(127, 'MOUSE LOGITECH G502 X PLUS LIGHTSPEED WIRELESS RGB BLACK', '599', 'MOUSE LOGITECH G502 X PLUS LIGHTSPEED WIRELESS RGB BLACK\n', 2, 10, 0, '2025-02-22 18:05:48', 0, NULL),
(128, 'Corsair Vengeance RGB Pro 64GB (32GB x 2) 3200MHz C16 DDR4 Desktop Memory – Black', '729', 'Memory Size 32GB\n\nPerformance Profile XMP 2.0\n\nTested Latency 16-20-20-38\n\nTested Speed (Up To) 3200\n\nMemory Type DDR4\n\nTested Voltage 1.35', 2, 4, 0, '2025-02-22 18:08:44', 0, NULL),
(129, 'CASE LIAN-LI PC-011 DYNAMIC XL TG FULL TOWER WHITE', '1170', 'CASE LIAN-LI PC-011 DYNAMIC XL TG FULL TOWER WHITE\n', 2, 12, 0, '2025-02-22 20:36:27', 980, NULL),
(130, 'NZXT H710 Gaming Case', '850', 'NZXT H710 Gaming Case\n', 1, 12, 0, '2025-02-22 20:40:43', 699, NULL),
(131, 'NZXT H210i Gaming Case', '649', 'NZXT H210i Gaming Case\n', 2, 12, 0, '2025-02-22 20:42:37', 0, NULL),
(132, 'CASE COOLERMASTER H500P MESH ARGB TG MID TOWER WHITE', '740', 'CASE COOLERMASTER H500P MESH ARGB TG MID TOWER WHITE\n', 2, 12, 0, '2025-02-22 20:44:11', 0, NULL),
(133, 'PSU ASUS ROG STRIX THOR 1200W PLATINUM II', '1520', 'POWER-WATT	1200W\n\nPOWER-TYPE	 80 PLUS PLATINUM\n\n', 2, 6, 0, '2025-02-22 20:47:37', 0, NULL),
(134, 'PSU ASUS TUF GAMING 850W 80+ GOLD', '650', 'POWER-WATT 850W\n\nPOWER-TYPE	 80 PLUS GOLD\n\n', 1, 6, 0, '2025-02-22 20:49:01', 0, NULL),
(135, 'GPU GIGABYTE GEFORCE RTX4070 SUPER GAMING OC 12G', '3200', 'GPU TYPE RTX4070S\n\nGPU MEMORY 12GB\n\nFeature	LED\n\nCOOLING FANS 3-FAN\n\n', 6, 2, 0, '2025-02-22 20:51:01', 2900, NULL),
(136, 'GPU MSI GEFORCE RTX 4070 SUPER VENTUS 3X OC 12GB', '3150', '\nGPU TYPE	\nRTX4070S\n\nGPU MEMORY	\n12GB\n\nFeature	\nLED\n\nCOOLING FANS	\n3-FAN', 3, 2, 0, '2025-02-22 20:53:36', 2899, NULL),
(137, 'MONITOR MSI ESPORTS G274QPX 27″ WQHD 2K IPS 240HZ', '1790', '\nMONITOR SIZE IN INCHES	\n27\"\n\nRESOLUTION	\n2560 X 1440 QHD\n\nFEATURES	\nFLAT\n\nPANEL TYPE	\nIPS\n\nFREQUENCY IN HERTZ	\n240', 9, 8, 0, '2025-02-22 20:56:08', 1590, NULL),
(138, 'MONITOR AOC Q27G2U/BK 27″ VA 2K 144HZ', '1250', '\nMONITOR SIZE IN INCHES	\n27\"\n\nRESOLUTION	\n2560 X 1440 QHD\n\nFEATURES	\nFLAT\n\nPANEL TYPE	\nVA\n\nFREQUENCY IN HERTZ	\n144', 2, 8, 0, '2025-02-22 20:58:01', 0, NULL),
(139, 'MONITOR GIGABYTE AORUS FI25F 25″ IPS 240HZ', '2070', 'MONITOR GIGABYTE AORUS FI25F 25″ IPS 240HZ', 3, 8, 0, '2025-02-22 21:00:33', 0, NULL),
(140, 'Gigabyte M27Q 27, QHD, IPS, 170Hz, 0.5ms Gaming Monitor', '1659', 'Gigabyte M27Q 27, QHD, IPS, 170Hz, 0.5ms Gaming Monitor\n', 2, 8, 0, '2025-02-22 21:05:15', 0, NULL),
(141, 'GIGABYTE X870E AORUS PRO ICE Motherboard', '2149', 'GIGABYTE X870E AORUS PRO ICE Motherboard\n', 0, 3, 0, '2025-02-22 21:08:19', 0, NULL),
(142, 'GIGABYTE Z890 EAGLE WIFI7 Motherboard', '1229', 'Supports Intel® Core™ Ultra processors (Series 2)\nDigital twin 14+1+2 phases VRM solution\nD5 Bionic Corsa for Infinite Memory Performance\nAI Perfdrive : Provides optimal and customized BIOS preset profile for users\nPremium Compatibility : 4*DDR5 with XMP Memory Module Support\nWIFI EZ-Plug : Quick and easy design for Wi-Fi antenna installation\nEZ-Latch Plus : PCIe and M.2 slots with Quick Release & Screwless Design\nEZ-Latch Click : M.2 heatsinks with screwless design\nFriendly UI : Multi-Theme, AIO Fan Control, and Q-Flash Auto Scan in BIOS and SW\nNew Power Monitor in  HWinfo for real-time monitoring on CPU power phases\nUltra-Fast Storage : 4*M.2 slots, including 1* PCIe 5.0 x4\nEfficient Thermal : VRM Thermal Armor Advanced & M.2 Thermal Guard\nFast Networking : 2.5GbE LAN & Wi-Fi 7\nExtended Connectivity : USB4 Type-C with DP-Alt, DisplayPort\nPCIe UD Slot X : PCIe 5.0 x16 slot with 10X strength for graphics card', 3, 3, 0, '2025-02-22 21:11:14', 0, NULL),
(143, 'GIGABYTE AERO 15 OLED UHD Gaming Laptop', '5799', 'i7-11800H, Ram 16GB, 1TB NVMe, RTX 3080 8GB, 4K UHD OLED\n\n', 1, 15, 0, '2025-02-22 21:19:53', 0, NULL),
(144, 'Gaming Desk Table – R-Table', '550', 'Simple design and smooth lines\nDoes not include RGB Light\nSmall footprint\nHeadset holder\nCup holder\nCable management system\nE1 particle board\nSturdy Y-shaped legs\nAnti-scratch nylon pad feet\nHigh durability coated steel frame\nSize (W*D*H) : (100-120-140)*60*73 cm', 2, 16, 0, '2025-02-22 21:24:33', 0, NULL),
(145, 'HEADSET LOGITECH G535 WIRELESS LIGHTSPEED BLACK', '550', 'HEADSET_TYPE	ON EAR\n\nHEADSET_CONNECTION	WIRELESS\n\nHEADSET_USE	GAMES', 3, 11, 0, '2025-02-25 13:07:43', 0, NULL),
(146, 'MOUSEPAD GLORIOUS 3XL EXTENDED WHITE 24X48 (1219mmX610mm)', '250', 'MOUSEPAD GLORIOUS 3XL EXTENDED WHITE 24X48 (1219mmX610mm)\n', 10, 10, 0, '2025-02-25 13:09:37', 0, NULL),
(147, 'CHAIR DXRACER P132 GAMING BLACK WHITE', '900', 'CHAIR DXRACER P132 GAMING BLACK WHITE\nChair type:	Gaming, Office\nUpholstery material:	Premium PU-leather\nFoam type:	High density mold shaping foam\nArmrests:	1-directional\nFrame construction:	Steel\nTilt function:	Full tilt\nTilt angle lock:	No\nHydraulics gas piston:	Class 4', 3, 14, 0, '2025-02-25 13:12:40', 0, NULL),
(148, 'COOLER FAN-CASE NZXT F120 RGB 3-FAN BLACK', '390', '\nCOOLER-TYPE	\nCASE-FAN\n\nMEASURMENT	\n120\n\n', 3, 7, 0, '2025-02-26 22:00:17', 0, NULL),
(149, 'MONITOR SAMSUNG C24RG50FZP 23.5” FHD CURVED VA 144HZ', '880', 'MONITOR SIZE IN INCHES	\n24\"\n\nRESOLUTION	\n1920X1080\n\nFEATURES	\nCURVED\n\nPANEL TYPE	\nVA\n\nFREQUENCY IN HERTZ	\n144', 3, 8, 0, '2025-02-28 00:49:41', 0, NULL),
(150, 'MONITOR DELL ULTRASHARP U2718Q 27” IPS 4K 60HZ', '2230', 'MONITOR SIZE IN INCHES	\n27\"\n\nRESOLUTION	\n3840 X 2160 4K UHD\n\nFEATURES	\nFLAT\n\nPANEL TYPE	\nIPS\n\nFREQUENCY IN HERTZ	\n60', 1, 8, 0, '2025-02-28 00:52:03', 0, NULL),
(151, 'GIGABYTE AORUS MASTER GeForce RTX 5080 16GB Video Card', '4800', ' Powered by the NVIDIA Blackwell architecture and DLSS 4\n Powered by GeForce RTX™ 5080\n Integrated with 16GB GDDR7 256bit memory interface\n WINDFORCE cooling system\n Hawk fan\n Composite metal grease for GPU\n Server-grade Thermal conductive gel\n LCD Edge View\n RGB Halo\n Dual BIOS (Performance / Silent)\n Reinforced structure\n Versatile VGA holder', 2, 2, 0, '2025-02-28 00:53:59', 4500, NULL),
(152, 'MOUSE GLORIOUS MODEL D MINUS WIRELESS MATTE BLACK', '350', '\nCONNECTION	\nWIRELESS\n\nUSAGE	\nGAMING', 2, 10, 0, '2025-02-28 01:03:44', 330, NULL),
(153, 'GPU MSI GEFORCE RTX 4060TI GAMING X TRIO 8GB', '2350', 'GPU TYPE	\nRTX4060TI\n\nGPU MEMORY	\n8GB\n\nCOOLING FANS	\n3-FAN\n', 2, 2, 0, '2025-03-03 16:38:20', 2150, NULL),
(154, 'GPU ASUS DUAL RTX4060-O8G-GAMING', '1550', 'GPU TYPE	\nRTX4060\n\nGPU MEMORY	\n8GB\n\nFeature	\nLED\n\nCOOLING FANS	\n2-FAN', 2, 2, 0, '2025-03-03 16:39:41', 0, NULL),
(155, 'KEYBOARD COOLERMASTER MK750 RGB MECHANICAL RED', '570', 'KEYBOARD COOLERMASTER MK750 RGB MECHANICAL RED\n', 3, 9, 0, '2025-03-04 16:53:54', 520, NULL),
(156, 'KEYBOARD ROCCAT MAGMA MEMBRANE RGB GAMING', '185', 'KEYBOARD ROCCAT MAGMA MEMBRANE RGB GAMING\n', 5, 9, 0, '2025-03-04 16:55:47', 0, NULL),
(158, 'PNY GeForce RTX 5080 16GB Triple Fan Video Card', '6129', 'PNY GeForce RTX 5080 16GB Triple Fan Video Card\n', 2, 2, 0, '2025-03-04 23:51:45', 0, NULL),
(159, 'MONITOR LG ULTRAGEAR 27GL650F-B 27” IPS 144HZ', '1200', 'MONITOR SIZE IN INCHES	\n27\"\n\nRESOLUTION	\n1920X1080\n\nFEATURES	\nFLAT\n\nPANEL TYPE	\nIPS\n\nFREQUENCY IN HERTZ	\n144', 7, 8, 0, '2025-03-06 00:11:56', 980, NULL),
(161, 'LIAN LI O11D EVO RGB Automobili Lamborghini Edition', '1799', 'LIAN LI O11D EVO RGB Automobili Lamborghini Edition\n', 2, 12, 0, '2025-03-06 00:40:22', 0, NULL),
(162, 'ASUS TUF DASH F15 FX516P-HN023 RTX3050TI GRAY', '4950', 'MONITOR IN INCHES	\n15.6\"\n\nCPU	\nI7 11GEN\n\nSTORAGE	\nSSD-1TB NVME\n\nMEMORY SIZE	\n8GB+8GB\n\nRSOLUTION	\n1920X1080\n\nMONTIORS HZ	\n144HZ\n\nOPERATING SYSTEM	\nDOS\n\nLAPTOP TYPE	\nNORMAL\n\nGPU	\nRTX3050TI', 2, 15, 0, '2025-03-06 00:44:58', 0, NULL),
(163, 'GPU GIGABYTE GEFORCE RTX4060-EAGLE-OC-8GD', '1399', 'GPU TYPE: RTX4060\n\nGPU MEMORY: 8GB\n\nFeature:	LED\n\nCOOLING FANS:	3-FAN', 2, 2, 0, '2025-03-06 00:52:24', 0, NULL),
(164, 'REDRAGON DRACONIC PRO K530 RGB 61% Wireless Mechanical Gaming Keyboard - White Switch', '339', 'REDRAGON DRACONIC PRO K530 RGB 61% Wireless Mechanical Gaming Keyboard - White Switch\n', 2, 9, 0, '2025-03-08 08:30:21', 0, NULL),
(165, 'MONITOR AOC C27G2ZE 27” CURVED VA 240HZ', '1350', 'MONITOR SIZE IN INCHES	\n27\"\n\nRESOLUTION	\n1920X1080\n\nFEATURES	\nCURVED\n\nPANEL TYPE	\nVA\n\nFREQUENCY IN HERTZ	\n240', 2, 8, 0, '2025-03-08 08:39:32', 0, NULL),
(166, 'MageGee Gsket Prussian Blue - Silver Switch', '219', 'MAGEGEE SKY81 Gasket Wired Keyboard - كيبورد 75 % ماقيي\nالميزات الرئيسية:\nتصميم Gasket Mount: يوفر تجربة كتابة ناعمة وتقليل الضوضاء والاهتزاز بفضل الوسائد العازلة.\nمفاتيح Hot-Swappable: يدعم مفاتيح 3-pin و5-pin القابلة للتبديل بسهولة لتخصيص لوحة المفاتيح.\nمفاتيح مخصصة مشحمة مسبقًا: مفاتيح MageGee (Blue Whale وViolet) بعمر يصل إلى 70 مليون ضغطة.\nإضاءة RGB: 18 وضعية إضاءة قابلة للتخصيص مع سطوع وسرعة قابلين للتعديل.\nزر 2 في 1: للتحكم بالإضاءة وحجم الصوت بسهولة.\nتصميم مضغوط بنسبة 75%: 83 مفتاحًا لتوفير المساحة مع دعم N-Key Rollover.\nأغطية مفاتيح ثلاثية الألوان: تقنية Double Injection لضمان وضوح النصوص والإضاءة.\nزر وضع العمل/اللعب: يتيح لك التبديل بين وضع العمل ووضع اللعب بضغطة زر لتحسين الأداء بما يناسب احتياجاتك.\nاتصال Type-C: كابل قابل للفصل لتوصيل مستقر وسريع.\nبرنامج مخصص: يأتي الكيبورد مع برنامج خاص يتيح لك تخصيص الأزرار والتحكم الكامل بإضاءة RGB ووضعيات الإضاءة.\nدعم أنظمة متعددة: متوافق مع Windows وMac وLinux.\n', 2, 9, 0, '2025-03-08 10:30:32', 0, NULL),
(167, 'COOLER LIQUID-CPU ASUS ROG RYUO III 360 ARGB WHITE', '1250', 'COOLER-TYPE	\nCPU-LIQUID-COOLER\n\nMEASURMENT	\n360', 4, 7, 0, '2025-03-08 08:43:40', 950, NULL),
(168, 'COOLER LIQUID-CPU NZXT KRAKEN 360 RGB BLACK 3-FAN', '1050', 'COOLER-TYPE	\nCPU-LIQUID-COOLER\n\nMEASURMENT	\n360', 3, 7, 0, '2025-03-08 10:23:24', 850, NULL),
(169, 'SSD KINGSTON A400 240GB 2.5” SATA3', '120', 'SSD Measurement	\n2.5\"\n\nSSD TYPE	\nSATA\n\nSSD SPEED	\n500\n\nSSD CAPACITY	\n240GB-250GB', 33, 5, 0, '2024-04-15 09:25:46', 0, NULL),
(170, 'SSD ADATA XPG SPECTRIX S40G 512GB M.2 RGB', '250', 'SSD Measurement	\nM2\n\nSSD TYPE	\nNVME\n\nSSD SPEED	\n3400\n\nSSD CAPACITY	\n480GB-512GB\n\nSSD RGB	\nRGB', 3, 5, 0, '2025-03-08 10:26:39', 0, NULL),
(171, 'SKY98 Gasket Wireless', '279', 'SKY98 Gasket Wireless\nTri-mode:2.4G/ Bluetooth/ wired, Gasket Keyboard, Hot-swappable, Customized Switch, 95% layout, support Win/Mac, RGB Backlit, Ergonomic design, Creamy sound keyboard', 3, 9, 0, '2025-03-08 10:28:04', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`) VALUES
(12, 5, 'https://watanimall.com/wp-content/uploads/2023/04/MT-AS-VG27WQ.png'),
(13, 5, 'https://watanimall.com/wp-content/uploads/2023/04/MT-AS-VG27WQ-3.png'),
(14, 5, 'https://watanimall.com/wp-content/uploads/2023/04/MT-AS-VG27WQ-2.png'),
(15, 5, 'https://watanimall.com/wp-content/uploads/2023/04/MT-AS-VG27WQ-5.png'),
(16, 6, 'https://dlcdnwebimgs.asus.com/gain/c6a425c7-97c3-4437-a2a1-674423f77480/w800/fwebp'),
(17, 6, 'https://watanimall.com/wp-content/uploads/2023/05/GPU-AS-4060TI-O8G.png'),
(18, 6, 'https://dlcdnwebimgs.asus.com/gain/a931ab36-eee5-4c88-80cf-923ef24c88f8/w800/fwebp'),
(19, 6, 'https://watanimall.com/wp-content/uploads/2023/05/GPU-AS-4060TI-O8G-1-600x600.png'),
(20, 7, 'https://watanimall.com/wp-content/uploads/2022/06/KB-ROG-XA05-1.png'),
(21, 7, 'https://watanimall.com/wp-content/uploads/2022/06/KB-ROG-XA05-3.png'),
(26, 9, 'https://watanimall.com/wp-content/uploads/2023/02/ACER-NH.QFWEC_.005-4.png'),
(27, 9, 'https://watanimall.com/wp-content/uploads/2023/02/ACER-NH.QFWEC_.005.png'),
(28, 9, 'https://watanimall.com/wp-content/uploads/2023/02/ACER-NH.QFWEC_.005-1.png'),
(29, 10, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRTX%203070%20Ti.png?alt=media&token=a30c7b86-e89b-4263-a4b9-d6acbb2b6c2b'),
(30, 10, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRTX%203070%20Ti3.png?alt=media&token=a57c602c-7bcd-4c48-8c43-0ac487028eff'),
(31, 10, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRTX%203070%20Ti2.png?alt=media&token=bf54dca4-922f-4101-b57c-6f455b0c3ba4'),
(32, 10, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRTX%203070%20Ti4.png?alt=media&token=ffb2f43d-3220-4619-b9ce-33f9f289ad91'),
(33, 11, 'https://watanimall.com/wp-content/uploads/2022/09/MT-AS-VG24VQE.png'),
(34, 11, 'https://watanimall.com/wp-content/uploads/2022/09/MT-AS-VG24VQE-1.png'),
(35, 11, 'https://watanimall.com/wp-content/uploads/2022/09/MT-AS-VG24VQE-2.png'),
(36, 11, 'https://watanimall.com/wp-content/uploads/2022/09/MT-AS-VG24VQE-5.png'),
(37, 11, 'https://watanimall.com/wp-content/uploads/2022/11/CASE-H710I-BLACKRED.png'),
(38, 11, 'https://watanimall.com/wp-content/uploads/2022/11/CASE-H710I-BLACKRED.png'),
(39, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fram%20(3).png?alt=media&token=bd881409-8246-4357-b350-9beaf195a906'),
(40, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fpayment-1.png?alt=media&token=f8db739a-b6f1-4579-949b-36e50539d3d9'),
(41, 11, 'https://watanimall.com/wp-content/uploads/2020/11/MT-AS-VA27EHE.png'),
(42, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRitaj.gif?alt=media&token=cb7d30c3-0e61-4183-b4ac-75d0e61668e9'),
(43, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fram%20(2).png?alt=media&token=4523622d-bb78-4a6e-a1d8-dc40581ffdc7'),
(44, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fram%20(3).png?alt=media&token=954ad61d-9fcf-4367-8c62-4b783c45de41'),
(45, 11, 'https://watanimall.com/wp-content/uploads/2022/04/MT-66D6GAC2IS.png'),
(46, 12, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2F1690663866_1_1690663866_WOJmVNDIVB.jpg?alt=media&token=50bf58c7-93ca-46c6-be2e-d9d331c77d6d'),
(47, 12, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2F1690663866_1_1690663866_wtIua4CqTh.jpg?alt=media&token=9d88108c-6b57-4363-bf8b-c76d32c93ed6'),
(48, 12, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2F1690663866_1_1690663866_Qz2GZ0yD2t.jpg?alt=media&token=f9b1752c-d81f-470a-9c4e-53f34afd5067'),
(49, 12, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2F1690663866_1_1690663866_2K6VEVn47m.jpg?alt=media&token=30f74d98-4236-4103-8ded-2f88ccb28178'),
(50, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fhyperx%20cloud1.png?alt=media&token=13dbbb5c-dc42-4a33-92da-76bcbc6d6576'),
(51, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FHS-CLOUD-ALPHAR-1.png?alt=media&token=bfd6d08d-0a7b-48b0-9d23-476bc919fcf5'),
(52, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FHS-CLOUD-ALPHAR-2.png?alt=media&token=1f08a509-4e38-4261-8180-d968de0ba6c0'),
(53, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FHS-CLOUD-ALPHAR-5.png?alt=media&token=26574a61-f067-4a1b-85da-c5677f1d0161'),
(54, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FHS-CLOUD-ALPHAR-6.png?alt=media&token=1f4867e8-260a-4f57-87b6-335be37d2498'),
(55, 9, 'https://watanimall.com/wp-content/uploads/2023/02/ACER-NH.QFWEC_.005-4.png'),
(56, 9, 'https://watanimall.com/wp-content/uploads/2023/02/ACER-NH.QFWEC_.005.png'),
(57, 9, 'https://watanimall.com/wp-content/uploads/2023/02/ACER-NH.QFWEC_.005-1.png'),
(58, 10, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRTX%203070%20Ti.png?alt=media&token=a30c7b86-e89b-4263-a4b9-d6acbb2b6c2b'),
(59, 10, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRTX%203070%20Ti3.png?alt=media&token=a57c602c-7bcd-4c48-8c43-0ac487028eff'),
(60, 10, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRTX%203070%20Ti2.png?alt=media&token=bf54dca4-922f-4101-b57c-6f455b0c3ba4'),
(61, 10, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRTX%203070%20Ti4.png?alt=media&token=ffb2f43d-3220-4619-b9ce-33f9f289ad91'),
(62, 11, 'https://watanimall.com/wp-content/uploads/2022/09/MT-AS-VG24VQE.png'),
(63, 11, 'https://watanimall.com/wp-content/uploads/2022/09/MT-AS-VG24VQE-1.png'),
(64, 11, 'https://watanimall.com/wp-content/uploads/2022/09/MT-AS-VG24VQE-2.png'),
(65, 11, 'https://watanimall.com/wp-content/uploads/2022/09/MT-AS-VG24VQE-5.png'),
(66, 11, 'https://watanimall.com/wp-content/uploads/2022/11/CASE-H710I-BLACKRED.png'),
(67, 11, 'https://watanimall.com/wp-content/uploads/2022/11/CASE-H710I-BLACKRED.png'),
(68, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fram%20(3).png?alt=media&token=bd881409-8246-4357-b350-9beaf195a906'),
(69, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fpayment-1.png?alt=media&token=f8db739a-b6f1-4579-949b-36e50539d3d9'),
(70, 11, 'https://watanimall.com/wp-content/uploads/2020/11/MT-AS-VA27EHE.png'),
(71, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FRitaj.gif?alt=media&token=cb7d30c3-0e61-4183-b4ac-75d0e61668e9'),
(72, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fram%20(2).png?alt=media&token=4523622d-bb78-4a6e-a1d8-dc40581ffdc7'),
(73, 11, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fram%20(3).png?alt=media&token=954ad61d-9fcf-4367-8c62-4b783c45de41'),
(74, 11, 'https://watanimall.com/wp-content/uploads/2022/04/MT-66D6GAC2IS.png'),
(75, 12, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2F1690663866_1_1690663866_WOJmVNDIVB.jpg?alt=media&token=50bf58c7-93ca-46c6-be2e-d9d331c77d6d'),
(76, 12, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2F1690663866_1_1690663866_wtIua4CqTh.jpg?alt=media&token=9d88108c-6b57-4363-bf8b-c76d32c93ed6'),
(77, 12, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2F1690663866_1_1690663866_Qz2GZ0yD2t.jpg?alt=media&token=f9b1752c-d81f-470a-9c4e-53f34afd5067'),
(78, 12, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2F1690663866_1_1690663866_2K6VEVn47m.jpg?alt=media&token=30f74d98-4236-4103-8ded-2f88ccb28178'),
(79, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2Fhyperx%20cloud1.png?alt=media&token=13dbbb5c-dc42-4a33-92da-76bcbc6d6576'),
(80, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FHS-CLOUD-ALPHAR-1.png?alt=media&token=bfd6d08d-0a7b-48b0-9d23-476bc919fcf5'),
(81, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FHS-CLOUD-ALPHAR-2.png?alt=media&token=1f08a509-4e38-4261-8180-d968de0ba6c0'),
(82, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FHS-CLOUD-ALPHAR-5.png?alt=media&token=26574a61-f067-4a1b-85da-c5677f1d0161'),
(83, 13, 'https://firebasestorage.googleapis.com/v0/b/zaid-539bb.appspot.com/o/product-images%2FHS-CLOUD-ALPHAR-6.png?alt=media&token=1f4867e8-260a-4f57-87b6-335be37d2498'),
(92, 12, 'das'),
(93, 11, 'ttttttttttttttttt'),
(1000, 12, 'adsasdasdasdasd'),
(1004, 18, 'https://watanimall.com/wp-content/uploads/2024/05/MT-MSI-G244F-E2-1.png'),
(1005, 18, 'https://watanimall.com/wp-content/uploads/2024/05/MT-MSI-G244F-E2-2.png'),
(1006, 18, 'https://watanimall.com/wp-content/uploads/2024/05/MT-MSI-G244F-E2-3.png'),
(1007, 18, 'https://watanimall.com/wp-content/uploads/2024/05/MT-MSI-G244F-E2-4.png'),
(1008, 18, 'https://watanimall.com/wp-content/uploads/2024/05/MT-MSI-G244F-E2.png'),
(1011, 20, 'https://watanimall.com/wp-content/uploads/2023/09/GPU-AS-D4060TI-O8G-WH-1.png'),
(1012, 20, 'https://watanimall.com/wp-content/uploads/2023/09/GPU-AS-D4060TI-O8G-WH-2.png'),
(1017, 23, 'https://watanimall.com/wp-content/uploads/2024/12/MT-AS-XG27ACG.png'),
(1026, 28, 'http://localhost:1001/uploads/1738371473720-GPU-GB-4070S-OC.png'),
(1027, 28, 'http://localhost:1001/uploads/1738371473732-GPU-GB-4070S-OC.png'),
(1028, 28, 'http://localhost:1001/uploads/1738371473739-GPU-GB-4070S-OC-1.png'),
(1029, 28, 'http://localhost:1001/uploads/1738371473747-GPU-GB-4070S-OC-2.png'),
(1030, 28, 'http://localhost:1001/uploads/1738371473753-GPU-GB-4070S-OC-3.png'),
(1031, 28, 'http://localhost:1001/uploads/1738371473758-GPU-GB-4070S-OC-4.png'),
(1037, 30, 'http://localhost:1001/uploads/1738451971686-1735750597_1_1735750597_JxnBZJDi7B.jpg'),
(1038, 30, 'http://localhost:1001/uploads/1738451971690-1735750597_1_1735750597_kKg3nu802x.jpg'),
(1039, 30, 'http://localhost:1001/uploads/1738451971692-1735750597_1_1735750597_UU5p9Sm8Wt.jpg'),
(1049, 37, 'http://localhost:1001/uploads/1738613271358-CL-H150-RGB.png'),
(1050, 37, 'http://localhost:1001/uploads/1738613271365-CL-H150-RGB-1.png'),
(1051, 37, 'http://localhost:1001/uploads/1738613271373-CL-H150-RGB-2.png'),
(1052, 37, 'http://localhost:1001/uploads/1738613271379-CL-H150-RGB-3.png'),
(1053, 38, 'https://watanimall.com/wp-content/uploads/2021/03/PSU-THOR-850P.png'),
(1054, 39, 'https://watanimall.com/wp-content/uploads/2023/12/PSU-LOKI-750P.png'),
(1062, 46, 'http://localhost:1001/uploads/1738882818068-GC-P132-NR-F2-158-7.png'),
(1063, 46, 'http://localhost:1001/uploads/1738882818081-GC-P132-NR-F2-158-6.png'),
(1064, 46, 'http://localhost:1001/uploads/1738882818088-GC-P132-NR-F2-158-8.png'),
(1065, 46, 'http://localhost:1001/uploads/1738882818095-GC-P132-NR-F2-158-9.png'),
(1071, 50, 'http://localhost:1001/uploads/1738889173158-1719519729_1_1719519729_fKOGLBa2Fc.png'),
(1072, 50, 'http://localhost:1001/uploads/1738889173171-1719519729_1_1719519729_0tj807NdKD.png'),
(1073, 50, 'http://localhost:1001/uploads/1738889173178-1719519729_1_1719519729_FKOd2aYeKK.png'),
(1074, 50, 'http://localhost:1001/uploads/1738889173184-1719519729_1_1719519729_INmLWdFecO.png'),
(1075, 50, 'http://localhost:1001/uploads/1738889173191-1719519729_1_1719519729_TRPwwxI5Te.png'),
(1078, 53, 'http://localhost:1001/uploads/1739063951032-1737913839_1_1737913839_PVWKRjd1PP.jpg'),
(1079, 53, 'http://localhost:1001/uploads/1739063951037-1737913839_1_1737913839_URnAli11ae.jpg'),
(1080, 53, 'http://localhost:1001/uploads/1739063951042-1737913839_1_1737913839_gJvSPu2BHG.jpg'),
(1081, 53, 'http://localhost:1001/uploads/1739063951047-1737913839_1_1737913839_r1qG6zcKoK.jpg'),
(1082, 54, 'http://localhost:1001/uploads/1739064108623-1736071536_1_1736071536_i1Zp1dR0Hn.jpg'),
(1083, 54, 'http://localhost:1001/uploads/1739064108628-1736071536_1_1736071536_zuON3QVVib.jpg'),
(1084, 54, 'http://localhost:1001/uploads/1739064108633-1736071536_1_1736071536_cYTH92rNpP.jpg'),
(1090, 57, 'http://localhost:1001/uploads/1739065880731-1724057180_1_1724057180_Uh7OcYr8B2.png'),
(1091, 57, 'http://localhost:1001/uploads/1739065880738-1724057180_1_1724057180_iqGhpmR9fI.png'),
(1093, 59, 'http://localhost:1001/uploads/1739067216271-1738165225_1_1738165225_MTCoW9JXFZ.jpg'),
(1094, 59, 'http://localhost:1001/uploads/1739067216278-1738165225_1_1738165225_bvzljafnUR.jpg'),
(1095, 60, 'http://localhost:1001/uploads/1739538237487-1719523308_1_1719523308_NgvkFxlWPX.png'),
(1096, 60, 'http://localhost:1001/uploads/1739538237498-1719523308_1_1719523308_gl5S6eoPOy.png'),
(1097, 60, 'http://localhost:1001/uploads/1739538237503-1719523308_1_1719523308_D9fnFFcDRA.png'),
(1098, 60, 'http://localhost:1001/uploads/1739538237509-1719523308_1_1719523308_MvKNyeaDhc.png'),
(1105, 63, 'http://localhost:1001/uploads/1739544442095-1734944073_1_1734944073_dEqlrZGDjl.jpg'),
(1106, 63, 'http://localhost:1001/uploads/1739544442102-1734944073_1_1734944073_8h6ian9YBb.jpg'),
(1107, 63, 'http://localhost:1001/uploads/1739544442108-1734944073_1_1734944073_tL5OIMW9di.jpg'),
(2332, 76, 'http://localhost:1001/uploads/1739951802009-1739694788_1_1739694788_RyB8t1vUpj.jpg'),
(2333, 76, 'http://localhost:1001/uploads/1739951802015-1739694788_1_1739694788_c3cWWjonuE.jpg'),
(2337, 76, 'http://localhost:1001/uploads/1739951830715-1739694788_1_1739694788_gh7SA3XBib.jpg'),
(2338, 76, 'http://localhost:1001/uploads/1739951830720-1739694788_1_1739694788_GS2NUaIe1h.jpg'),
(2339, 76, 'http://localhost:1001/uploads/1739951830725-1739694788_1_1739694788_DqV6gFd52X.jpg'),
(2342, 77, 'http://localhost:1001/uploads/1739978112995-1739893037_1_1739893037_m7LAjyLVFR.jpg'),
(2343, 77, 'http://localhost:1001/uploads/1739978113002-1739893037_1_1739893037_fmnvhHvDEb.jpg'),
(2344, 77, 'http://localhost:1001/uploads/1739978113011-1739893037_1_1739893037_oFcimFezYq.jpg'),
(2345, 78, 'http://localhost:1001/uploads/1739979325470-1735745905_1_1735745905_5UnMgeRlSD.jpg'),
(2346, 78, 'http://localhost:1001/uploads/1739979325480-1735745797_1_1735745797_uCQU9lQQTm.jpg'),
(2368, 99, 'http://localhost:1001/uploads/1740043114728-DESK-GO-SLAYER-I-1.png'),
(2369, 99, 'http://localhost:1001/uploads/1740043114737-DESK-GO-SLAYER-I.png'),
(2370, 99, 'http://localhost:1001/uploads/1740043114744-DESK-GO-SLAYER-I-8.png'),
(2371, 99, 'http://localhost:1001/uploads/1740043114760-DESK-GO-SLAYER-I-6.png'),
(2372, 99, 'http://localhost:1001/uploads/1740043114772-DESK-GO-SLAYER-I-2.png'),
(2373, 100, 'http://localhost:1001/uploads/1740043318155-CASE-PC-011DW.png'),
(2374, 100, 'http://localhost:1001/uploads/1740043318164-CASE-PC-011DW-10.png'),
(2375, 100, 'http://localhost:1001/uploads/1740043318172-CASE-PC-011DW-4.png'),
(2376, 100, 'http://localhost:1001/uploads/1740043318178-CASE-PC-011DW-1.png'),
(2383, 102, 'http://localhost:1001/uploads/1740044001554-CASE-TD500-CRYSTAL.png'),
(2384, 102, 'http://localhost:1001/uploads/1740044001567-CASE-TD500-CRYSTAL-6.png'),
(2385, 102, 'http://localhost:1001/uploads/1740044001581-CASE-TD500-CRYSTAL-5.png'),
(2386, 102, 'http://localhost:1001/uploads/1740044001594-CASE-TD500-CRYSTAL-4.png'),
(2387, 102, 'http://localhost:1001/uploads/1740044001611-CASE-TD500-CRYSTAL-3.png'),
(2388, 102, 'http://localhost:1001/uploads/1740044001623-CASE-TD500-CRYSTAL-2.png'),
(2389, 103, 'http://localhost:1001/uploads/1740044258508-RM-D60G-4133-16-5.png'),
(2390, 103, 'http://localhost:1001/uploads/1740044258516-RM-D60G-4133-16-1.png'),
(2391, 103, 'http://localhost:1001/uploads/1740044258521-RM-D60G-4133-16-3.png'),
(2392, 103, 'http://localhost:1001/uploads/1740044258530-RM-D60G-4133-16-2.png'),
(2393, 104, 'http://localhost:1001/uploads/1740044465740-MT-AOC-AG251FZ2-2.png'),
(2394, 104, 'http://localhost:1001/uploads/1740044465746-MT-AOC-AG251FZ2-3.png'),
(2395, 104, 'http://localhost:1001/uploads/1740044465751-MT-AOC-AG251FZ2-7.png'),
(2396, 104, 'http://localhost:1001/uploads/1740044465756-MT-AOC-AG251FZ2-5.png'),
(2397, 104, 'http://localhost:1001/uploads/1740044465761-MT-AOC-AG251FZ2-7.png'),
(2398, 104, 'http://localhost:1001/uploads/1740044465765-MT-AOC-AG251FZ2-8.png'),
(2399, 105, 'http://localhost:1001/uploads/1740045149163-MB-GB-B560-P-AX.png'),
(2400, 105, 'http://localhost:1001/uploads/1740045149172-MB-GB-B560-P-AX-2.png'),
(2401, 105, 'http://localhost:1001/uploads/1740045149178-MB-GB-B560-P-AX-3.png'),
(2402, 105, 'http://localhost:1001/uploads/1740045149185-MB-GB-B560-P-AX-4.png'),
(2403, 105, 'http://localhost:1001/uploads/1740045149190-MB-GB-B560-P-AX-1.png'),
(2404, 106, 'http://localhost:1001/uploads/1740048312213-38009_1.webp'),
(2405, 106, 'http://localhost:1001/uploads/1740048312219-38009_2.webp'),
(2406, 106, 'http://localhost:1001/uploads/1740048312223-38009_3.webp'),
(2407, 106, 'http://localhost:1001/uploads/1740048312228-38009_4.webp'),
(2408, 107, 'http://localhost:1001/uploads/1740048467592-1739693161_1_1739693161_qAfQSfT6nh.jpg'),
(2409, 108, 'http://localhost:1001/uploads/1740048588563-1726230157_1_1726230157_b46TL1xsoM.png'),
(2410, 108, 'http://localhost:1001/uploads/1740048588569-1726230157_1_1726230157_GXHRfIBkJT.png'),
(2411, 108, 'http://localhost:1001/uploads/1740048588575-1726230157_1_1726230157_63ycUCd7Mr.png'),
(2412, 109, 'http://localhost:1001/uploads/1740048690978-1726140426_1_1726140426_HgTWLwmF6Y.png'),
(2413, 109, 'http://localhost:1001/uploads/1740048690986-1726141128_1_1726141128_3Lof0XjRvG.png'),
(2414, 109, 'http://localhost:1001/uploads/1740048690993-1726141128_1_1726141128_yJ1UQx5NGo.png'),
(2415, 110, 'http://localhost:1001/uploads/1740048807359-1723481794_1_1723481794_As1KwaeX7F.png'),
(2416, 110, 'http://localhost:1001/uploads/1740048807364-1723481794_1_1723481794_rQPQjbMWDR.png'),
(2419, 111, 'http://localhost:1001/uploads/1740049004010-1738747063_1_1738747063_Fds8SFSzwP.png'),
(2423, 113, 'http://localhost:1001/uploads/1740049286089-1726587940_1_1726587940_zOtSJrUxaJ.png'),
(2424, 113, 'http://localhost:1001/uploads/1740049286097-1726587940_1_1726587940_37AHP4iRNu.png'),
(2425, 113, 'http://localhost:1001/uploads/1740049286103-1726587940_1_1726587940_G9drfugDAV.png'),
(2426, 113, 'http://localhost:1001/uploads/1740049286108-1726587940_1_1726587940_MSTR5ecgF7.png'),
(2427, 114, 'http://localhost:1001/uploads/1740049558496-1688838289_1_1688838289_GM6fcS5kUO.png'),
(2428, 114, 'http://localhost:1001/uploads/1740049558503-1688838289_1_1688838289_qTZbdLxhSU.png'),
(2429, 114, 'http://localhost:1001/uploads/1740049558508-1688838289_1_1688838289_8FPG8hv44B.png'),
(2430, 114, 'http://localhost:1001/uploads/1740049558514-1688838289_1_1688838289_Eu47318TNp.png'),
(2431, 114, 'http://localhost:1001/uploads/1740049558519-1688838288_1_1688838288_9K6QtV2IoS.png'),
(2436, 116, 'http://localhost:1001/uploads/1740077939603-1735739279_1_1735739279_oWuPV767Kz.jpg'),
(2437, 116, 'http://localhost:1001/uploads/1740077939614-1735739279_1_1735739279_w2yeNxth0x.jpg'),
(2438, 116, 'http://localhost:1001/uploads/1740077939622-1735739279_1_1735739279_tI89khdhqo.jpg'),
(2439, 110, 'http://localhost:1001/uploads/1740134713405-1723481794_1_1723481794_e1JhGItMEg.png'),
(2440, 8, 'http://localhost:1001/uploads/1740134860914-CL-ML120-RGB-3B (1).png'),
(2441, 8, 'http://localhost:1001/uploads/1740134860922-CL-ML120-RGB-3B-6.png'),
(2442, 8, 'http://localhost:1001/uploads/1740134860930-CL-ML120-RGB-3B-5.png'),
(2443, 8, 'http://localhost:1001/uploads/1740134860936-CL-ML120-RGB-3B-4.png'),
(2444, 8, 'http://localhost:1001/uploads/1740134860942-CL-ML120-RGB-3B-3.png'),
(2445, 8, 'http://localhost:1001/uploads/1740134860949-CL-ML120-RGB-3B-2.png'),
(2446, 117, 'http://localhost:1001/uploads/1740135228978-DESK-ACER-2.png'),
(2447, 117, 'http://localhost:1001/uploads/1740135228987-DESK-ACER-4.png'),
(2448, 117, 'http://localhost:1001/uploads/1740135228994-DESK-ACER-2.png'),
(2449, 117, 'http://localhost:1001/uploads/1740135229000-DESK-ACER-3.png'),
(2450, 118, 'http://localhost:1001/uploads/1740141508480-DESK-TM-Y-RW-RGB-5.png'),
(2451, 118, 'http://localhost:1001/uploads/1740141508488-DESK-TM-Y-RW-RGB-6.png'),
(2452, 118, 'http://localhost:1001/uploads/1740141508494-DESK-TM-Y-RW-RGB-8.png'),
(2453, 118, 'http://localhost:1001/uploads/1740141508501-DESK-TM-Y-RW-RGB-4.png'),
(2454, 119, 'http://localhost:1001/uploads/1740141655149-LAP-82XV00K9IV.png'),
(2455, 119, 'http://localhost:1001/uploads/1740141655156-LAP-82XV00K9IV-3.png'),
(2456, 119, 'http://localhost:1001/uploads/1740141655161-LAP-82XV00K9IV-6.png'),
(2457, 119, 'http://localhost:1001/uploads/1740141655166-LAP-82XV00K9IV-4.png'),
(2458, 120, 'http://localhost:1001/uploads/1740165309149-CPU-I7-14700K-B.png'),
(2459, 121, 'http://localhost:1001/uploads/1740165358946-CPU-7900X-BOX.png'),
(2460, 122, 'http://localhost:1001/uploads/1740165466527-RM-D50G-3200-16-3.png'),
(2461, 122, 'http://localhost:1001/uploads/1740165466536-RM-D50G-3200-16-1.png'),
(2462, 122, 'http://localhost:1001/uploads/1740165466542-RM-D50-3200-16-1.png'),
(2463, 122, 'http://localhost:1001/uploads/1740165466547-RM-D50G-3200-16-2.png'),
(2464, 123, 'http://localhost:1001/uploads/1740165651289-KB-G413-TKL-SE (1).png'),
(2465, 123, 'http://localhost:1001/uploads/1740165651295-KB-G413-TKL-SE-5 (1).png'),
(2466, 123, 'http://localhost:1001/uploads/1740165651301-KB-G413-TKL-SE-4 (1).png'),
(2467, 123, 'http://localhost:1001/uploads/1740165651305-KB-G413-TKL-SE-2.png'),
(2468, 124, 'http://localhost:1001/uploads/1740165756816-KB-VULCAN-TKL.png'),
(2469, 124, 'http://localhost:1001/uploads/1740165756823-KB-VULCAN-TKL-4.png'),
(2470, 124, 'http://localhost:1001/uploads/1740165756833-KB-VULCAN-TKL-6.png'),
(2471, 124, 'http://localhost:1001/uploads/1740165756840-KB-VULCAN-TKL-5.png'),
(2472, 124, 'http://localhost:1001/uploads/1740165756849-KB-VULCAN-TKL-7.png'),
(2473, 125, 'http://localhost:1001/uploads/1740242701498-GLORIOUS-3XL-GAMING-MOUSE-PAD-Stealth-Edition-24_x48_-Black.png'),
(2474, 126, 'http://localhost:1001/uploads/1740247382715-Glorious-Gaming-Mouse-Model-O-Matte-Black-1-2.png'),
(2475, 126, 'http://localhost:1001/uploads/1740247382724-MODEL-O-.png'),
(2476, 126, 'http://localhost:1001/uploads/1740247382730-MODEL-O-4.png'),
(2477, 126, 'http://localhost:1001/uploads/1740247382745-MODEL-O-5.png'),
(2478, 126, 'http://localhost:1001/uploads/1740247382751-MODEL-O-3.png'),
(2479, 127, 'http://localhost:1001/uploads/1740247548821-MS-G502-X-PLUS-B.png'),
(2480, 127, 'http://localhost:1001/uploads/1740247548829-MS-G502-X-PLUS-B-1.png'),
(2481, 127, 'http://localhost:1001/uploads/1740247548835-MS-G502-X-PLUS-B-4.png'),
(2482, 127, 'http://localhost:1001/uploads/1740247548841-MS-G502-X-PLUS-B-3.png'),
(2483, 127, 'http://localhost:1001/uploads/1740247548847-MS-G502-X-PLUS-B-2.png'),
(2484, 128, 'http://localhost:1001/uploads/1740247724747-1726555785_1_1726555785_DXW1NbDi9n.png'),
(2485, 129, 'http://localhost:1001/uploads/1740256587132-CASE-PC-011DXLW.png'),
(2486, 129, 'http://localhost:1001/uploads/1740256587142-CASE-PC-011DXLW-1.png'),
(2487, 129, 'http://localhost:1001/uploads/1740256587148-CASE-PC-011DXLW-2.png'),
(2488, 129, 'http://localhost:1001/uploads/1740256587154-CASE-PC-011DXLW-3.png'),
(2489, 129, 'http://localhost:1001/uploads/1740256587160-CASE-PC-011DXLW-5.png'),
(2490, 129, 'http://localhost:1001/uploads/1740256587166-CASE-PC-011DXLW-4.png'),
(2491, 129, 'http://localhost:1001/uploads/1740256587172-CASE-PC-011DXLW-6.png'),
(2492, 130, 'http://localhost:1001/uploads/1740256843740-1692294183_1_1692294183_nGzaIirpo7.png'),
(2493, 130, 'http://localhost:1001/uploads/1740256843748-1692294183_1_1692294183_WsJ8njoaWb.png'),
(2494, 130, 'http://localhost:1001/uploads/1740256843756-1692294183_1_1692294183_Fc3JXLbO7M.png'),
(2495, 130, 'http://localhost:1001/uploads/1740256843763-1692294183_1_1692294183_j7pgzl0cHb.png'),
(2496, 130, 'http://localhost:1001/uploads/1740256843771-1692294183_1_1692294183_dTR58XzSna.png'),
(2497, 131, 'http://localhost:1001/uploads/1740256957048-1689538818_1_1689538818_ncWqYrvSKJ.jpg'),
(2498, 131, 'http://localhost:1001/uploads/1740256957054-1689538818_1_1689538818_IRDZdUUc9f.jpg'),
(2499, 131, 'http://localhost:1001/uploads/1740256957058-1689538818_1_1689538818_cy8thowsUN.jpg'),
(2500, 131, 'http://localhost:1001/uploads/1740256957064-1689538818_1_1689538818_OFuc997ORv.jpg'),
(2501, 132, 'http://localhost:1001/uploads/1740257051033-H500P-ARGB-Mesh-White.png'),
(2502, 133, 'http://localhost:1001/uploads/1740257257051-PSU-THOR-1200P-II.png'),
(2503, 133, 'http://localhost:1001/uploads/1740257257057-PSU-THOR-1200P-II-3.png'),
(2504, 133, 'http://localhost:1001/uploads/1740257257062-PSU-THOR-1200P-II-6.png'),
(2505, 133, 'http://localhost:1001/uploads/1740257257067-PSU-THOR-1200P-II-5.png'),
(2506, 133, 'http://localhost:1001/uploads/1740257257073-PSU-THOR-1200P-II-1.png'),
(2507, 133, 'http://localhost:1001/uploads/1740257257080-PSU-THOR-1200P-II-2.png'),
(2508, 134, 'http://localhost:1001/uploads/1740257341280-PSU-TUF-850G.png'),
(2509, 134, 'http://localhost:1001/uploads/1740257341288-PSU-TUF-850G-1.png'),
(2510, 134, 'http://localhost:1001/uploads/1740257341295-PSU-TUF-850G-2.png'),
(2511, 135, 'http://localhost:1001/uploads/1740257461180-GPU-GB-4070S-OC.png'),
(2512, 135, 'http://localhost:1001/uploads/1740257461188-GPU-GB-4070S-OC-2.png'),
(2513, 135, 'http://localhost:1001/uploads/1740257461195-GPU-GB-4070S-OC-4.png'),
(2514, 135, 'http://localhost:1001/uploads/1740257461200-GPU-GB-4070S-OC-3.png'),
(2515, 135, 'http://localhost:1001/uploads/1740257461205-GPU-GB-4070S-OC-1.png'),
(2516, 136, 'http://localhost:1001/uploads/1740257616777-GPU-MSI-4070S-VEN.png'),
(2517, 136, 'http://localhost:1001/uploads/1740257616788-GPU-MSI-4070S-VEN-2.png'),
(2518, 136, 'http://localhost:1001/uploads/1740257616798-GPU-MSI-4070S-VEN-3.png'),
(2521, 137, 'http://localhost:1001/uploads/1740257768850-MT-MSI-G274QPX.png'),
(2522, 137, 'http://localhost:1001/uploads/1740257768858-MT-MSI-G274QPX-4.png'),
(2523, 137, 'http://localhost:1001/uploads/1740257768865-MT-MSI-G274QPX-5.png'),
(2524, 137, 'http://localhost:1001/uploads/1740257768870-MT-MSI-G274QPX-3.png'),
(2525, 137, 'http://localhost:1001/uploads/1740257768875-MT-MSI-G274QPX-1.png'),
(2526, 138, 'http://localhost:1001/uploads/1740257881058-AOC-Q27G2U.png'),
(2527, 138, 'http://localhost:1001/uploads/1740257881065-Q27G2UBK-7-1.png'),
(2528, 138, 'http://localhost:1001/uploads/1740257881070-Q27G2UBK-9-1.png'),
(2529, 138, 'http://localhost:1001/uploads/1740257881075-Q27G2UBK-8-1.png'),
(2530, 139, 'http://localhost:1001/uploads/1740258033538-1.png'),
(2531, 139, 'http://localhost:1001/uploads/1740258033545-3.png'),
(2532, 139, 'http://localhost:1001/uploads/1740258033550-4-1.png'),
(2533, 139, 'http://localhost:1001/uploads/1740258033556-5-1.png'),
(2534, 140, 'http://localhost:1001/uploads/1740258315426-1702753785_1_1702753785_pzYxJ6DhLc.png'),
(2535, 140, 'http://localhost:1001/uploads/1740258315434-1702753785_1_1702753785_3wrQClXy15.png'),
(2536, 140, 'http://localhost:1001/uploads/1740258315441-1702753785_1_1702753785_VKgjAaJbjt.png'),
(2537, 141, 'http://localhost:1001/uploads/1740258499514-1736513017_1_1736513017_2xD9dx7yCc.jpg'),
(2538, 141, 'http://localhost:1001/uploads/1740258499521-1736513017_1_1736513017_2xD9dx7yCc.jpg'),
(2539, 141, 'http://localhost:1001/uploads/1740258499526-1736513017_1_1736513017_wN5XgFQTWx.jpg'),
(2540, 142, 'http://localhost:1001/uploads/1740258674304-1734861607_1_1734861607_uSkdbv6jVr.jpg'),
(2541, 142, 'http://localhost:1001/uploads/1740258674310-1734861607_1_1734861607_bSJtBvoFYu.jpg'),
(2542, 142, 'http://localhost:1001/uploads/1740258674317-1734861607_1_1734861607_qZt4A5VQVb.jpg'),
(2543, 143, 'http://localhost:1001/uploads/1740259193235-1689798775_1_1689798775_MrpnPxsXa9.png'),
(2544, 143, 'http://localhost:1001/uploads/1740259193243-1689798775_1_1689798775_rAdrzNC3nd.png'),
(2545, 143, 'http://localhost:1001/uploads/1740259193250-1689798775_1_1689798775_xpKLL2jlfu.png'),
(2546, 143, 'http://localhost:1001/uploads/1740259193256-1689798775_1_1689798775_Vmfzew26hq.png'),
(2547, 144, 'http://localhost:1001/uploads/1740259473142-R2-6.jpg'),
(2548, 144, 'http://localhost:1001/uploads/1740259473148-R2-5.jpg'),
(2549, 144, 'http://localhost:1001/uploads/1740259473153-R2-4.jpg'),
(2550, 144, 'http://localhost:1001/uploads/1740259473158-R2-6.jpg'),
(2551, 144, 'http://localhost:1001/uploads/1740259473163-R2-2.jpg'),
(2553, 145, 'http://localhost:1001/uploads/1740488863493-HS-G535-6 (1).png'),
(2554, 145, 'http://localhost:1001/uploads/1740488863503-HS-G535-8.png'),
(2555, 145, 'http://localhost:1001/uploads/1740488863510-HS-G535-6 (1).png'),
(2556, 145, 'http://localhost:1001/uploads/1740488863516-HS-G535-9.png'),
(2557, 146, 'http://localhost:1001/uploads/1740488977024-GW-3XL.png'),
(2558, 146, 'http://localhost:1001/uploads/1740488977031-GW-3XL-3.png'),
(2559, 146, 'http://localhost:1001/uploads/1740488977038-GW-3XL-2.png'),
(2560, 146, 'http://localhost:1001/uploads/1740488977045-GW-3XL-1.png'),
(2561, 147, 'http://localhost:1001/uploads/1740489160057-GC-P132-NW-F2-158-8.png'),
(2562, 147, 'http://localhost:1001/uploads/1740489160064-GC-P132-NW-F2-158-3-1.png'),
(2563, 147, 'http://localhost:1001/uploads/1740489160071-GC-P132-NW-F2-158-4.png'),
(2564, 147, 'http://localhost:1001/uploads/1740489160076-GC-P132-NW-F2-158-5.png'),
(2565, 147, 'http://localhost:1001/uploads/1740489160081-GC-P132-NW-F2-158-2-1.png'),
(2566, 147, 'http://localhost:1001/uploads/1740489160086-GC-P132-NW-F2-158-7.png'),
(2567, 148, 'http://localhost:1001/uploads/1740607217405-CL-F120-BLAC.png'),
(2568, 148, 'http://localhost:1001/uploads/1740607217423-CL-F120-BLAC-1.png'),
(2569, 148, 'http://localhost:1001/uploads/1740607217430-CL-F120-BLAC-2.png'),
(2570, 148, 'http://localhost:1001/uploads/1740607217437-CL-F120-BLAC-4.png'),
(2571, 148, 'http://localhost:1001/uploads/1740607217442-CL-F120-BLAC-3.png'),
(2572, 149, 'http://localhost:1001/uploads/1740703781258-MT-C24RG50FZP.png'),
(2573, 149, 'http://localhost:1001/uploads/1740703781277-MT-C24RG50FZP-3.png'),
(2574, 149, 'http://localhost:1001/uploads/1740703781283-MT-C24RG50FZP-2.png'),
(2575, 149, 'http://localhost:1001/uploads/1740703781290-MT-C24RG50FZP-1.png'),
(2576, 150, 'http://localhost:1001/uploads/1740703923344-U2718Q.png'),
(2581, 151, 'http://localhost:1001/uploads/1740704067474-1740658123_1_1740658123_PPOERsQhvt.jpg'),
(2582, 151, 'http://localhost:1001/uploads/1740704067481-1740658123_1_1740658123_b8HQASUHVu.jpg'),
(2583, 151, 'http://localhost:1001/uploads/1740704067488-1740658123_1_1740658123_rc0HukJ5Ni.jpg'),
(2584, 151, 'http://localhost:1001/uploads/1740704067493-1740658123_1_1740658123_K4MTUeVRgh.jpg'),
(2585, 152, 'http://localhost:1001/uploads/1740704624366-GLO-MS-DMW-MB.png'),
(2586, 152, 'http://localhost:1001/uploads/1740704624375-GLO-MS-DMW-MB-2.png'),
(2587, 152, 'http://localhost:1001/uploads/1740704624380-GLO-MS-DMW-MB-1.png'),
(2588, 153, 'http://localhost:1001/uploads/1741019900460-GPU-MSI-4060TI-X-TRIO.png'),
(2589, 153, 'http://localhost:1001/uploads/1741019900471-GPU-MSI-4060TI-X-TRIO-1.png'),
(2590, 153, 'http://localhost:1001/uploads/1741019900480-GPU-MSI-4060TI-X-TRIO-3.png'),
(2591, 153, 'http://localhost:1001/uploads/1741019900486-GPU-MSI-4060TI-X-TRIO-2.png'),
(2592, 154, 'http://localhost:1001/uploads/1741019981806-GPU-AS-D4060-O8G.png'),
(2593, 154, 'http://localhost:1001/uploads/1741019981814-GPU-AS-D4060-O8G-4.png'),
(2594, 154, 'http://localhost:1001/uploads/1741019981821-GPU-AS-D4060-O8G-3.png'),
(2595, 154, 'http://localhost:1001/uploads/1741019981827-GPU-AS-D4060-O8G-2.png'),
(2596, 155, 'http://localhost:1001/uploads/1741107234073-KB-MK750-M-RED-5.png'),
(2597, 155, 'http://localhost:1001/uploads/1741107234083-KB-MK750-M-RED-1.png'),
(2598, 155, 'http://localhost:1001/uploads/1741107234090-KB-MK750-M-RED-2.png'),
(2599, 155, 'http://localhost:1001/uploads/1741107234097-KB-MK750-M-RED-3.png'),
(2601, 156, 'http://localhost:1001/uploads/1741107347779-KB-MAGMA-RGB.png'),
(2602, 156, 'http://localhost:1001/uploads/1741107347786-KB-MAGMA-RGB-2.png'),
(2603, 156, 'http://localhost:1001/uploads/1741107347793-KB-MAGMA-RGB-5.png'),
(2604, 156, 'http://localhost:1001/uploads/1741107347801-KB-MAGMA-RGB-4.png'),
(2605, 156, 'http://localhost:1001/uploads/1741107347807-KB-MAGMA-RGB-3.png'),
(2608, 158, 'http://localhost:1001/uploads/1741132305925-1741110480_1_1741110480_VHJ9lkylQW.png'),
(2609, 158, 'http://localhost:1001/uploads/1741132305933-1741110480_1_1741110480_3z0yWtAvtl.png'),
(2610, 158, 'http://localhost:1001/uploads/1741132305940-1741110480_1_1741110480_23lhrnWJmB.png'),
(2611, 159, 'http://localhost:1001/uploads/1741219916716-MT-LG-27GL650.png'),
(2612, 159, 'http://localhost:1001/uploads/1741219916731-MT-LG-27GL650-4.png'),
(2613, 159, 'http://localhost:1001/uploads/1741219916741-MT-LG-27GL650-5 (1).png'),
(2614, 159, 'http://localhost:1001/uploads/1741219916757-MT-LG-27GL650-1.png'),
(2620, 161, 'http://localhost:1001/uploads/1741221622778-1739694020_1_1739694020_hJjUBWtsL2.jpg'),
(2621, 161, 'http://localhost:1001/uploads/1741221622785-1739694020_1_1739694020_SwgVR2tEQQ.jpg'),
(2622, 161, 'http://localhost:1001/uploads/1741221622791-1739694020_1_1739694020_VQUD7CWgrx.jpg'),
(2623, 161, 'http://localhost:1001/uploads/1741221622797-1739694020_1_1739694020_NLulCFnNXX.jpg'),
(2624, 161, 'http://localhost:1001/uploads/1741221622803-1739694020_1_1739694020_QVynnFvJo1.jpg'),
(2625, 162, 'http://localhost:1001/uploads/1741221898470-FX516PE-HN023-4.png'),
(2626, 162, 'http://localhost:1001/uploads/1741221898478-FX516PE-HN023-3.png'),
(2627, 162, 'http://localhost:1001/uploads/1741221898484-FX516PE-HN023-5.png'),
(2628, 162, 'http://localhost:1001/uploads/1741221898489-FX516PE-HN023-1.png'),
(2629, 162, 'http://localhost:1001/uploads/1741221898494-FX516PE-HN023-2.png'),
(2630, 163, 'http://localhost:1001/uploads/1741222344972-GPU-GB-4060-EAGLE.png'),
(2631, 163, 'http://localhost:1001/uploads/1741222344980-GPU-GB-4060-EAGLE-4.png'),
(2632, 163, 'http://localhost:1001/uploads/1741222344986-GPU-GB-4060-EAGLE-3.png'),
(2633, 163, 'http://localhost:1001/uploads/1741222344991-GPU-GB-4060-EAGLE-5.png'),
(2634, 164, 'http://localhost:1001/uploads/1741422621025-1727341358_1_1727341358_sajgoDGQfi (1).png'),
(2635, 164, 'http://localhost:1001/uploads/1741422621037-1727341358_1_1727341358_xeYcYeOBm6.png'),
(2636, 164, 'http://localhost:1001/uploads/1741422621045-1727341358_1_1727341358_GaPncYJmgz.png'),
(2637, 164, 'http://localhost:1001/uploads/1741422621052-1727341358_1_1727341358_0IdEKiPBS8.png'),
(2638, 165, 'http://localhost:1001/uploads/1741423172021-MT-AOC-C27G2Z.png'),
(2639, 165, 'http://localhost:1001/uploads/1741423172037-MT-AOC-C27G2Z-3.png'),
(2640, 165, 'http://localhost:1001/uploads/1741423172046-MT-AOC-C27G2Z-2.png'),
(2641, 165, 'http://localhost:1001/uploads/1741423172054-MT-AOC-C27G2Z-4.png'),
(2642, 165, 'http://localhost:1001/uploads/1741423172060-MT-AOC-C27G2Z-1.png'),
(2643, 166, 'http://localhost:1001/uploads/1741423232733-1_fbb90ba0-66fc-4005-8b90-b3e7aabd79d1.webp'),
(2644, 166, 'http://localhost:1001/uploads/1741423232740-2_d0edd6a3-1fdb-4b03-bc9e-503fb2674cfc.webp'),
(2646, 167, 'http://localhost:1001/uploads/1741423420117-CL-RYUO-360-ARGB.png'),
(2647, 167, 'http://localhost:1001/uploads/1741423420125-CL-RYUO-360-ARGB-1.png'),
(2648, 167, 'http://localhost:1001/uploads/1741423420131-CL-RYUO-360-ARGB-4.png'),
(2649, 167, 'http://localhost:1001/uploads/1741423420137-CL-RYUO-360-ARGB-6.png'),
(2650, 167, 'http://localhost:1001/uploads/1741423420143-CL-RYUO-360-ARGB-5.png'),
(2651, 168, 'http://localhost:1001/uploads/1741429404284-CL-NZXT-KR360-BL (1).png'),
(2652, 168, 'http://localhost:1001/uploads/1741429404294-CL-NZXT-KR360-BL-2.png'),
(2653, 168, 'http://localhost:1001/uploads/1741429404301-CL-NZXT-KR360-BL-3.png'),
(2654, 168, 'http://localhost:1001/uploads/1741429404307-CL-NZXT-KR360-BL-4.png'),
(2655, 169, 'http://localhost:1001/uploads/1741429546654-SSD-A400-240GB.png'),
(2656, 170, 'http://localhost:1001/uploads/1741429599661-SSD-S40G-512M.png'),
(2661, 166, 'http://localhost:1001/uploads/1741430179981-3_0669c526-8bed-484c-b6a6-6c0f6c64c312.webp'),
(2662, 171, 'http://localhost:1001/uploads/1741430901105-1720593057067b988d96a55a2d4c7576a8e58b92d0796.jpg'),
(2663, 171, 'http://localhost:1001/uploads/1741430901190-1720593127325efe90a8e604a7c840e88d03a67f6b7d8.jpg'),
(2664, 171, 'http://localhost:1001/uploads/1741430901211-71muirsT7wL._AC_SL1500_.jpg'),
(2665, 171, 'http://localhost:1001/uploads/1741430901221-1720593127336c1616449b32ee5cdcceb0188e229c4f3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `product_types`
--

CREATE TABLE `product_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_types`
--

INSERT INTO `product_types` (`id`, `name`) VALUES
(1, 'CPU'),
(2, 'GPU'),
(3, 'Motherboard'),
(4, 'RAM'),
(5, 'Storage'),
(6, 'Power Supply'),
(7, 'Cooling System'),
(8, 'Monitor'),
(9, 'Keyboard'),
(10, 'Mouse'),
(11, 'Headset'),
(12, 'PC Case'),
(13, 'Speaker'),
(14, 'Gaming Chair'),
(15, 'Laptop'),
(16, 'Table');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` varchar(255) DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `is_admin`, `email`, `phone`) VALUES
(1, 'zaid', '123123', 'yes', 'zaid231@gmail.com', ''),
(2, 'testuser', 'password123', '0', 'test@example.com', '1234567890'),
(4, 'Zaid Salah', 'zaid123', '0', 'zaid321@gmail.com', '0585511872'),
(5, 'Zaid Emad', 'zaid123', '0', 'zaidsalah-2013@hotmail.com', '0585511872');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_type` (`type_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_types`
--
ALTER TABLE `product_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2666;

--
-- AUTO_INCREMENT for table `product_types`
--
ALTER TABLE `product_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_product_type` FOREIGN KEY (`type_id`) REFERENCES `product_types` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
