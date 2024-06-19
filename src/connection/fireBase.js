const admin = require("firebase-admin");

const serviceAccount = require("../alumni-images-firebase-adminsdk-ta6ia-b7ac2a38cf.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "alumni-images.appspot.com",
});

const bucket = admin.storage().bucket();

async function uploadToFireStore(photoBuffer, name) {
    const photo = bucket.file(name)
    await photo.save(photoBuffer, {
        metadata: {
            contentType: "image/jpeg"
        },
        public: true,
    });
    return photo.publicUrl();
}

module.exports = uploadToFireStore;


// const admin = require("firebase-admin");
// const serviceAccount = require("../alumni-images-firebase-adminsdk-ta6ia-b7ac2a38cf.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "alumni-images.appspot.com",
// });

// const bucket = admin.storage().bucket();

// async function uploadToFireStore(photoBuffer, name) {
//     const fileExtension = name.split('.').pop(); // Get the file extension
//     let contentType = 'image/jpeg'; // Default content type

//     // Map common file extensions to content types
//     const contentTypeMap = {
//         'jpg': 'image/jpeg',
//         'jpeg': 'image/jpeg',
//         'png': 'image/png',
//         'gif': 'image/gif',
//         // Add more mappings for other file formats if needed
//     };

//     // Check if content type for the file extension is defined, if yes, use it
//     if (contentTypeMap[fileExtension.toLowerCase()]) {
//         contentType = contentTypeMap[fileExtension.toLowerCase()];
//     }

//     const photo = bucket.file(name);
//     await photo.save(photoBuffer, {
//         metadata: {
//             contentType: contentType
//         },
//         public: true,
//     });
//     return photo.publicUrl();
// }

// module.exports = uploadToFireStore;
