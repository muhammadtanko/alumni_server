const userController = require("../controllers/user.controller");
const { Router } = require("express");

module.exports = () => {
    const api = Router();

    api.post("/", async (req, res) => {
        try {
            const body = req.body;
            const { ok, data, message } = await userController.registerUser(body);
            if (ok) {
                res.status(201).json({ ok, data });
            } else {
                res.status(500).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.get("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const { ok, data, message } = await userController.getUser(id);
            if (ok) {
                res.status(200).json({ ok, data });
            } else {
                res.status(404).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.get("/", async (req, res) => {
        try {
            const { ok, data, message } = await userController.getUsers();
            if (ok) {
                res.status(200).json({ ok, data });
            } else {
                res.status(500).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.put("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const { ok, data, message } = await userController.updateUser(id, body);
            if (ok) {
                res.status(200).json({ ok, data });
            } else {
                res.status(404).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    api.delete("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            const { ok, data, message } = await userController.deleteUser(id);
            if (ok) {
                res.status(200).json({ ok, data });
            } else {
                res.status(404).json({ ok, message });
            }
        } catch (error) {
            res.status(500).json({ ok: false, message: error.message });
        }
    });

    return api;
};
