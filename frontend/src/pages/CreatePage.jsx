import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack,Select } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		category: "",
		description: "",
		starttime: "",
		endtime: "",
		escalatedPerson: "",
		remarks: "",
	});
	const toast = useToast();

	const { createProduct } = useProductStore();

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewProduct({category: "", description: "", starttime: "", endtime: "", escalatedPerson: "", remarks: ""});
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					What seems to be the problem? 🤔
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
							<Select
								placeholder="Select Category"
								name="category"
								value={newProduct.category}
								onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
								isRequired
							>
								<option value="Core Switch">Core Switch</option>
								<option value="WAN Firewalls">WAN Firewalls</option>
								<option value="Perimeter Firewalls">Perimeter Firewalls</option>
								<option value="SAP Tunnels">SAP Tunnels</option>
								<option value="Access Switches">Access Switches</option>
								<option value="Access Points">Access Points</option>
								<option value="Virtual Machines">Virtual Machines</option>
								<option value="Backup Servers">Backup Servers</option>
								<option value="Citrix">Citrix</option>
							</Select>
						
						<Input
							placeholder="Description"
							name="description"
							value={newProduct.description}
							onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
							isRequired
						/>
						<Input
							placeholder="Start Date and Time"
							type="datetime-local"
							name="starttime"
							value={newProduct.starttime}
							onChange={(e) => setNewProduct({ ...newProduct, starttime: e.target.value })}
							isRequired
						/>
						<Input
							placeholder="End Date and Time"
							type="datetime-local"
							name="endtime"
							value={newProduct.endtime}
							onChange={(e) => setNewProduct({ ...newProduct, endtime: e.target.value })}						
						/>
						<Input
							placeholder="Escalated Person"
							name="escalatedPerson"
							value={newProduct.escalatedPerson}
							onChange={(e) => setNewProduct({ ...newProduct, escalatedPerson: e.target.value })}							
						/>
						<Input
							placeholder="Remarks"
							name="remarks"
							value={newProduct.remarks}
							onChange={(e) => setNewProduct({ ...newProduct, remarks: e.target.value })}
							
						/>

						<Button colorScheme="blue" onClick={handleAddProduct} w="full">
							Add Problem
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;