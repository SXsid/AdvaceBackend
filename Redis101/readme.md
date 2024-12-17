# **LeetCode Submission Cycle using Redis (Queue + Pub-Sub + WebSocket)**

---

## **1. Queue to Execute the Code**

Redis **Queue** (`List`) is used to handle and process the code submissions in the order they are received.

![Queue Workflow](https://i.postimg.cc/5tCjmMT2/Screenshot-2024-12-17-193808.png)

---

## **2. Pub-Sub to Deliver Results to Correct Users**

Redis **Pub-Sub** is used to publish the code execution result to the correct user who submitted the problem.

![Pub-Sub Workflow](https://i.postimg.cc/P5Zk3rX9/Screenshot-2024-12-17-200640.png)

---

## **How It Works**

1. **Queue**:  
   - When a user submits their code, it is pushed into a Redis queue.  
   - The worker processes the queue (e.g., evaluates the code).

2. **Pub-Sub**:  
   - After the worker finishes processing the code, the result is published using Redis Pub-Sub.  
   - The specific user listens for updates via WebSocket.

3. **WebSocket**:  
   - Real-time updates are sent to the client when the results are ready.

---
