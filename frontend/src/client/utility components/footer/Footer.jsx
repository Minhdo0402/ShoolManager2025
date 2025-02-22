import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        bgcolor: "#34495e", // Dark blue-gray background for a more muted, sophisticated feel
        color: "#fff", // White text for contrast
        padding: "40px 60px", // Spacious padding
        mt: 5,
        borderTop: "2px solid #2c3e50", // Subtle border in a slightly darker shade
      }}
      component={"footer"}
    >
      {/* Left Section: About */}
      <Box sx={{ flex: "0 0 25%", pr: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: "18px",
            letterSpacing: "1px",
            color: "#bdc3c7", // Muted light gray for the section title
            transition: "color 0.3s", // Smooth transition for hover effect
            "&:hover": {
              color: "#f39c12", // Subtle yellow hover effect
            },
          }}
        >
          About
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#ecf0f1", // Lighter gray text for better contrast
            wordBreak: "break-word",
            lineHeight: "1.6",
          }}
        >
          The School Management System is a comprehensive solution for managing
          school operations effectively. From student records to staff
          management, we’ve got it all covered.
        </Typography>
      </Box>

      {/* Center Section: Main Content */}
      <Box
        sx={{
          flex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "-160px", // Shifts the content slightly to the left
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: "22px",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#bdc3c7", // Muted text color for a more professional, understated look
          }}
        >
          School Management System
        </Typography>
        {/* Navigation Links */}
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            mb: 2,
            "& a": {
              textDecoration: "none",
              color: "#ecf0f1", // Soft light gray for links
              fontWeight: "500",
              fontSize: "16px",
              transition: "color 0.3s", // Smooth transition for hover effect
              "&:hover": {
                color: "#f39c12", // Muted yellow on hover
              },
            },
          }}
        >
          <Link href="/about">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </Box>
        {/* Social Media Icons */}
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            mb: 2,
          }}
        >
          <IconButton
            href="https://facebook.com"
            target="_blank"
            color="inherit"
            sx={{
              color: "#3b5998",
              transition: "transform 0.3s, color 0.3s",
              "&:hover": { transform: "scale(1.2)", color: "#2d4373" },
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            color="inherit"
            sx={{
              color: "#1da1f2",
              transition: "transform 0.3s, color 0.3s",
              "&:hover": { transform: "scale(1.2)", color: "#1c91d4" },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            href="https://linkedin.com"
            target="_blank"
            color="inherit"
            sx={{
              color: "#0077b5",
              transition: "transform 0.3s, color 0.3s",
              "&:hover": { transform: "scale(1.2)", color: "#005b8b" },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            color="inherit"
            sx={{
              color: "#e1306c",
              transition: "transform 0.3s, color 0.3s",
              "&:hover": { transform: "scale(1.2)", color: "#d81b60" },
            }}
          >
            <Instagram />
          </IconButton>
        </Box>
        {/* Copyright */}
        <Typography variant="body2" sx={{ color: "#bdc3c7", fontSize: "14px" }}>
          © 2024 School Management System. All rights reserved.
        </Typography>
      </Box>

      {/* Right Section: Quick Links */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          pl: 0,
          ml: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: "18px",
            letterSpacing: "1px",
            color: "#bdc3c7", // Muted gray for the section title
            transition: "color 0.3s",
            "&:hover": {
              color: "#f39c12", // Subtle yellow on hover
            },
          }}
        >
          Quick Links
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center", // Center the links horizontally
            justifyContent: "center", // Align the links vertically within the container
            marginLeft: "10px", // Shift the entire box slightly to the right
            "& a": {
              textDecoration: "none",
              color: "#ecf0f1", // Light gray for the links
              fontSize: "16px",
              fontWeight: "500",
              transition: "color 0.3s", // Smooth transition for hover effect
              "&:hover": {
                color: "#f39c12", // Muted yellow on hover
              },
            },
          }}
        >
          <Link href="/admissions">Admissions</Link>
          <Link href="/events">Events</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/faqs">FAQs</Link>
        </Box>
      </Box>
    </Box>
  );
}
