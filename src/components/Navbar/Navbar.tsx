/* eslint-disable react/no-children-prop */
import React, { useRef } from "react";
import {
  useDisclosure,
  HStack,
  Stack,
  IconButton,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useColorMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Text,
  Link,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon, SunIcon, MoonIcon, SearchIcon } from "@chakra-ui/icons";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const btnMenuRef = useRef();
  const Links = [{ page: "/", name: "URBETRACK GO" }];

  return (
    <Stack
      alignItems="center"
      bgColor={colorMode === "dark" ? "primary" : "white"}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
      h="47px"
      justifyContent="center"
      position="relative"
      px={{ base: 10, sm: 20, lg: 20, xl: 30 }}
      top={0}
      w="100%"
      zIndex={1}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent={{ base: "end", lg: "space-between" }}
        maxW={{ base: "100%", xl: "1152px" }}
        w="100%"
      >
        <HStack
          as={"nav"}
          className="nav-links"
          color="white"
          display={{ base: "none", md: "flex" }}
          spacing={10}
        >
          <Link
            as={RouterLink}
            color={colorMode === "dark" ? "white" : "primary.500"}
            cursor="pointer"
            display="flex"
            fontWeight="normal"
            style={{ textDecoration: "none" }}
            to="/"
          >
            <Text fontWeight={700} mr={1}>
              URBETRACK
            </Text>
            <Text fontWeight={300}>GO</Text>
          </Link>
        </HStack>

        <HStack display={{ base: "none", md: "flex" }} spacing={8}>
          <InputGroup>
            <InputLeftElement children={<SearchIcon color="primary.500" />} pointerEvents="none" />
            <Input borderColor="primary.500" placeholder="Buscar" rounded="15px" type="direction" />
          </InputGroup>

          <IconButton
            aria-label="color mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            isRound={true}
            padding={0}
            onClick={toggleColorMode}
          />
        </HStack>

        <IconButton
          ref={btnMenuRef}
          aria-label={"Open Menu"}
          backgroundColor="transparent"
          display={{ md: "none" }}
          icon={!isOpen && <HamburgerIcon h={8} w={8} />}
          size={"md"}
          onClick={onOpen}
        />
      </Stack>

      <Drawer finalFocusRef={btnMenuRef} isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={colorMode === "dark" ? "white" : "black"} />
          <DrawerHeader
            color={colorMode === "dark" ? "white" : "black"}
            marginBottom={6}
            marginLeft={2}
          >
            Menu
          </DrawerHeader>
          <DrawerBody>
            <Stack marginLeft={4} spacing={6}>
              <VStack>
                <Menu>
                  <MenuButton as={Button} cursor={"pointer"} rounded={"full"} variant={"link"}>
                    <Avatar
                      size={"md"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                  </MenuList>
                </Menu>
              </VStack>
              <VStack
                alignItems="flex-start"
                color={colorMode === "dark" ? "white" : "black"}
                spacing={6}
              >
                {Links.map((link, index) => (
                  <Link key={index} to={`${link.page}`}>
                    <Text color={colorMode === "dark" ? "white" : "black"} cursor="pointer">
                      {link.name}
                    </Text>
                  </Link>
                ))}
              </VStack>
              <VStack alignItems="flex-start">
                <IconButton
                  aria-label="color mode"
                  icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                  isRound={true}
                  padding={0}
                  onClick={toggleColorMode}
                />
              </VStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Stack>
  );
};
