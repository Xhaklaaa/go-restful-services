<template>
    <div class="admin-form">
      <h2>Admin Form</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="profileId">Profile ID:</label>
          <input
            type="text"
            id="profileId"
            v-model="profileId"
            required
          />
        </div>
        <div class="form-group">
          <label for="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            ref="imageInput"
            @change="handleFileChange"
            accept="image/png"
            required
          />
        </div>
        <button type="submit" :disabled="isSubmitting">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'AdminForm',
  setup() {
    const profileId = ref('');
    const imageFile = ref(null);
    const isSubmitting = ref(false);

    const handleFileChange = (event) => {
      imageFile.value = event.target.files[0];
    };

    const handleSubmit = async () => {
      if (!profileId.value || !imageFile.value) {
        toast.error('Profile ID and image are required.');
        return;
      }

      if (imageFile.value.type !== 'image/png') {
        toast.error('Please upload a PNG image.');
        return;
      }

      isSubmitting.value = true;

      const formData = new FormData();
      formData.append('profileId', profileId.value);
      formData.append('image', imageFile.value);

      try {
        const response = await axios.post('http://localhost:9000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          toast.success('Image uploaded successfully.');
          // Optionally clear the form
          profileId.value = '';
          imageFile.value = null;
          document.getElementById('image').value = '';
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image. Please try again.');
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      profileId,
      handleSubmit,
      handleFileChange,
      isSubmitting,
    };
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
</style>