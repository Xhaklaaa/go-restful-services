<template>
    <div class="admin-form">
      <h1 style="margin-bottom: 40px">Admin</h1>
      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="productID">Product ID:</label>
            <input
              type="text"
              id="productID"
              name="id"
              placeholder=""
              required
              style="width: 80px"
              v-model="id"
              @change="changeHandler"
            />
            <span class="form-text">Enter the product id to upload an image for</span>
            <div v-if="!id" class="invalid-feedback">Please provide a product ID.</div>
          </div>
          <div class="form-group">
            <label for="fileInput">File:</label>
            <button @click="triggerFileInput">Choose File</button>
            <input
              type="file"
              id="fileInput"
              name="file"
              accept="image/png"
              placeholder=""
              required
              @change="changeHandler"
              ref="fileInput"
              style="display: none;"
            />
            <span class="form-text">Image to associate with the product</span>
            <div v-if="!file" class="invalid-feedback">Please select a PNG file to upload.</div>
          </div>
          <button type="submit" :disabled="buttonDisabled">Submit form</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'AdminForm',
  data() {
    return {
      id: '',
      file: null,
      buttonDisabled: false,
    };
  },
  methods: {
    changeHandler(event) {
      if (event.target.name === 'file') {
        this.file = event.target.files[0];
        if (!this.file.type.match('image/png')) {
          toast.error('Please upload a PNG image.');
          this.file = null;
          event.target.value = '';
        }
      } else {
        this.id = event.target.value;
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleSubmit() {
      if (!this.id || !this.file) {
        toast.error('Product ID and file are required.');
        return;
      }

      this.buttonDisabled = true;

      const formData = new FormData();
      formData.append('id', this.id);
      formData.append('file', this.file);

      try {
        const response = await axios.post('http://localhost:9000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          toast.success('Image uploaded successfully.');
          this.id = '';
          this.file = null;
          this.$refs.fileInput.value = '';
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
      } finally {
        this.buttonDisabled = false;
      }
    },
  },
};
</script>
  
<style scoped>
.admin-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="file"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-text {
  display: block;
  margin-top: 5px;
  color: #666;
}

.invalid-feedback {
  display: block;
  margin-top: 5px;
  color: #dc3545;
}
</style>
