import {
  Close, LocationOn, Map, MenuOutlined, ShoppingBagOutlined
} from "@mui/icons-material";
import { Badge, Box, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SocialIcon } from 'react-social-icons';
import reactLogo from "../../assets/img/logo.png";
import { setIsCartOpen } from "../../state";
import { shades, theme } from "../../theme";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(false);

  async function getCategories() {
    const categories = await fetch("https://biorais.herokuapp.com/api/categories", {
      method: "GET",
    });
    const categoriesJson = await categories.json();
    console.log({ categoriesJson });
    dispatch(setCategories(categoriesJson.data));
  }

  useEffect(() => {
    getCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const matches = useMediaQuery('(min-width:600px)');
  console.log({ matches });

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="75px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width={matches ? "70%" : "70%"}
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        <Box>
          <IconButton onClick={() => setOpen(!open)} sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing="20px"
          sx={{ "&:hover": { cursor: "pointer" } }}
          color={shades.secondary[500]}
        >
          <Box
            ml={matches ? "200px !important" : 0}
            onClick={() => navigate("/")}
          >
            <img
              alt="Bio Rais"
              width="70px"
              height="70px"
              src={reactLogo}
              style={{ objectFit: "contain", paddingTop: 4 }}
            />
          </Box>
          {matches && (
            <Box ml="200px !important">
              <IconButton sx={{ color: "black", mt: 1 }}>
              <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x12fd347540b9a6db:0x38d97ea17c623bb7?utm_source=mstt_1&entry=gps&lucs=swa">
                <LocationOn sx={{ color: "green" }} />
                </a>
              </IconButton>
              <IconButton sx={{ color: "black" }}>
                <SocialIcon url="https://www.tiktok.com/@bio.rais?lang=fr" network="tiktok" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
              </IconButton>
              <IconButton sx={{ color: "black" }}>
                <SocialIcon url="https://www.facebook.com/biorais" network="facebook" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
              </IconButton>
              {matches && (
                <>
                  <IconButton sx={{ color: "black" }}>
                    <SocialIcon url="https://www.instagram.com/bio.rais/?hl=fr" network="instagram" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                  </IconButton>

                  <IconButton sx={{ color: "black" }}>
                    <SocialIcon url="https://www.youtube.com/@bioRais" network="youtube" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                  </IconButton>
                </>
              )}

            </Box>
          )}


        </Stack >
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >


          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
        </Box>
      </Box >
      {
        open && (
          <Stack
            width={250}
            height="100vh"
            position="absolute"
            bgcolor="#04bbac"
            boxShadow={theme.shadows[2]}
            p={4}
            sx={{
              top: 0,
              zIndex: 15,
              overflowY: "hidden",
            }}
          >
            <IconButton onClick={() => setOpen(false)} sx={{ p: 0, posiiton: "absolute", right: -70, top: 5, ":hover": { backgroundColor: "inherit" } }}>
              <Close sx={{ p: 0 }} />
            </IconButton>
            <Typography variant="h2" color="#dda">
              Menu
            </Typography>
            <Typography variant="h5" color="#dda" mt={3}>
              Categories
            </Typography>
            <Stack p={1} spacing={2} sx={{ zIndex: 5 }}>
              {categories &&
                categories.map((item, index) => (
                  <Box
                    key={index}
                    component={Link}
                    to={`category/${item.id}`}
                    onClick={() => navigate.to(`category/${item.id}`)}
                    sx={{
                      textDecoration: "none",
                      cursor: "pointer"
                    }}
                  >
                    <Typography key={index} fontSize="17px" color="white">
                      {item.attributes.name}
                    </Typography>
                  </Box>
                ))}
            </Stack>
            {!matches && (
              <Box>
              <IconButton sx={{ color: "black" }}>
                <a href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x12fd347540b9a6db:0x38d97ea17c623bb7?utm_source=mstt_1&entry=gps&lucs=swa">
                  <LocationOn sx={{ color: "green" }} />
                </a>
                </IconButton>
                <IconButton sx={{ color: "black" }}>
                  <SocialIcon url="https://www.tiktok.com/@bio.rais?lang=fr" network="tiktok" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                </IconButton>
                <IconButton sx={{ color: "black" }}>
                  <SocialIcon url="https://www.facebook.com/biorais" network="facebook" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                </IconButton>
                <IconButton sx={{ color: "black" }}>
                  <SocialIcon url="https://www.instagram.com/bio.rais/?hl=fr" network="instagram" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                </IconButton>

                <IconButton sx={{ color: "black" }}>
                  <SocialIcon url="https://www.youtube.com/@bioRais" network="youtube" style={{ width: "20px", height: "20px", borderRadius: "50%" }} />
                </IconButton>
              </Box>
            )}
          </Stack>
        )
      }
    </Box >
  );
}

export default Navbar;
