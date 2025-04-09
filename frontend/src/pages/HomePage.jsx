import { Container, SimpleGrid, VStack, Text, HStack } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import DateFilter from "../components/DateFilter";
import CategoryFilter from "../components/CategoryFilter";
import ResetFilter from "../components/ResetFilter";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const location = useLocation();

  const dateFilterRef = useRef(null);
  const categoryFilterRef = useRef(null);

  const categories = [
    "Core Switch",
    "WAN Firewalls",
    "Perimeter Firewalls",
    "SAP Tunnels",
    "Access Switches",
    "Access Points",
    "Virtual Machines",
    "Backup Servers",
    "Citrix",
  ];

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = products;

    if (selectedDate) {
      filtered = filtered.filter((product) => {
        const productDate = new Date(product.starttime).toISOString().split("T")[0];
        return productDate === selectedDate;
      });
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [selectedDate, selectedCategory, products]);

  // Reset filters when the "/" route is accessed
  useEffect(() => {
    if (location.pathname === "/") {
      handleResetFilters();
    }
  }, [location.pathname]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleResetFilters = () => {
    setSelectedDate("");
    setSelectedCategory("");

    // Reset the UI of DateFilter and CategoryFilter
    if (dateFilterRef.current) {
      dateFilterRef.current.reset();
    }
    if (categoryFilterRef.current) {
      categoryFilterRef.current.reset();
    }
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Filters
        </Text>
        <HStack spacing={4}>
          {/* Date Filter */}
          <DateFilter
            ref={dateFilterRef}
            label="Filter by Date"
            onDateChange={handleDateChange}
          />

          {/* Category Filter */}
          <CategoryFilter
            ref={categoryFilterRef}
            label="Filter by Category"
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />

          {/* Reset Filters Button */}
          <ResetFilter onReset={handleResetFilters} />
        </HStack>

        <SimpleGrid
          columns={{
            base: 1,
            md: 1,
            lg: 1,
          }}
          spacing={10}
          w={"full"}
        >
          {filteredProducts.slice().reverse().map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {filteredProducts.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;