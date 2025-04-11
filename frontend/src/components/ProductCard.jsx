import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.600");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: "message",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Box p={4}>
        <Heading as="h2" size="l" mb={2}>
          Category - {product.category}
        </Heading>

        <Text fontWeight="bold" fontSize="l" color={textColor} mb={0}>
          Description - {product.description}
        </Text>

        <Text fontWeight="bold" fontSize="l" color={textColor} mb={0}>
          Start Time - {product.starttime}
        </Text>
        <Text fontWeight="bold" fontSize="l" color={textColor} mb={0}>
          End Time - {product.endtime}
        </Text>
        <Text fontWeight="bold" fontSize="l" color={textColor} mb={0}>
          Escalated Person - {product.escalatedPerson}
        </Text>
        <Text fontWeight="bold" fontSize="l" color={textColor} mb={2}>
          Remarks - {product.remarks}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Update Problem</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4}>
              <Select
                placeholder="Select Category"
                name="category"
                value={updatedProduct.category}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    category: e.target.value,
                  })
                }
                isRequired
              >
                <option value="Core Switch">Core Switch</option>
                <option value="WAN Firewalls">WAN Firewalls</option>
                <option value="Perimeter Firewalls">Perimeter Firewalls</option>
                <option value="SAP Tunnels">SAP Tunnels</option>
                <option value="Access Switches">Access Switches</option>
                <option value="Access Points">Access Points</option>
                <option value="Virtual Machines - VCenter">Virtual Machines - VCenter</option>
								<option value="Backup Servers - Avamar">Backup Servers - Avamar</option>
								<option value="Critical Alert">Critical Alert</option>
								<option value="Server Room Alerts">Server Room Alerts</option>
								<option value="IDRAC Alerts">IDRAC Alerts</option>
								<option value="Dialog">Dialog</option>
								<option value="SLT">SLT</option>
								<option value="Citrix">Citrix</option>
              </Select>

              <Input
                placeholder="Description"
                name="description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
                isRequired
              />
              <Input
                placeholder="Start Date and Time"
                name="starttime"
                type="datetime-local"
                value={updatedProduct.starttime}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    starttime: e.target.value,
                  })
                }
                isRequired
              />
              <Input
                placeholder="End Date and Time"
                name="endtime"
                type="datetime-local"
                value={updatedProduct.endtime}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    endtime: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Escalated Person"
                name="escalatedPerson"
                value={updatedProduct.escalatedPerson}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    escalatedPerson: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Remarks"
                name="remarks"
                value={updatedProduct.remarks}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    remarks: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
