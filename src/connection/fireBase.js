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
            contentType: "image/svg+xml"
        },
        public: true,
    });
    return photo.publicUrl();
}

module.exports = uploadToFireStore;