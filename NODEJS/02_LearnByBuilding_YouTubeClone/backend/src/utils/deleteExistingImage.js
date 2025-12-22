const deleteExistingImage = (existing_image_path, name_of_image) => {
    // 4. CLEANUP: Delete the old file from your PC uploads/ folder
        if (existing_image_path && fs.existsSync(existing_image_path)) {
            try {
                fs.unlinkSync(existing_image_path); // Deletes the file from your hard drive
                console.log(`Old local ${name_of_image} deleted:`, existing_image_path);
                return true;
            } catch (err) {
                console.error(`Error deleting old file '${name_of_image}':`, err);
                return false;
            }
        }
};

export default deleteExistingImage;