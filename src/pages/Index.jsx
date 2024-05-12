import React, { useState } from "react";
import { Container, VStack, Heading, Input, Button, Text, Box, Divider, useToast } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";

const Index = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const toast = useToast();

  const handleSendMessage = () => {
    if (input.trim() === "") {
      toast({
        title: "Empty message",
        description: "Please type a question before sending.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setMessages([...messages, { text: input, sender: "user" }]);
    // Simulate a bot response
    setTimeout(() => {
      setMessages((messages) => [...messages, { text: `Let me help you with "${input}"`, sender: "bot" }]);
    }, 1000);
    setInput("");
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} w="full">
        <Heading as="h1" size="xl" mb={4}>
          StudyHelp <FaRobot />
        </Heading>
        <VStack spacing={4} w="full" maxH="60vh" overflowY="auto">
          {messages.map((message, index) => (
            <Box key={index} w="full" bg={message.sender === "user" ? "blue.100" : "green.100"} p={3} borderRadius="lg" alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}>
              <Text>{message.text}</Text>
            </Box>
          ))}
        </VStack>
        <Divider />
        <VStack w="full">
          <Input placeholder="Type your question here..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} />
          <Button colorScheme="blue" onClick={handleSendMessage}>
            Send
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
