# Use an official Python runtime as a parent image
FROM python:3.12.3

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend application code
COPY . .

# Expose the port your FastAPI app runs on
EXPOSE 8080

# Command to run the application
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]
