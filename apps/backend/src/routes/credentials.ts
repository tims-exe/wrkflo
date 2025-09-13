import { Router } from "express";
import { CredentialModel } from "../models/credentialModel";

const credentialModel = new CredentialModel();
export const credRouter: Router = Router();

credRouter.post("/new", async (req, res) => {
    console.log('POST: /credentials/new')
    try {
        const userId = req.userId;
        if (!userId) return

        const { app, key, name } = req.body;
        if (!app || !key || !name) {
            return res.json({
                success: false,
                message: "credentials required"
            });
        }
        const newCred = await credentialModel.createCred({ userId, app, key, name });

        return res.json({
            success: true,
            credential: newCred
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "Error creating credential"
        });
    }
});

credRouter.get("/", async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return

        const creds = await credentialModel.getAllCreds(userId);
        return res.json({
            success: true,
            credentials: creds
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "Error fetching credentials"
        });
    }
});


credRouter.delete("/:id", async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) return

        const credId = req.params.id;
        if (!credId) {
            return res.json({
                success: false, message: "Credential ID is required"
            });
        }

        const result = await credentialModel.deleteCred(credId, userId);

        if (result.deletedCount === 0) {
            return res.json({
                success: false,
                message: "Credential not found"
            });
        }

        return res.json({
            success: true,
            message: "Credential deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: "Error deleting credential"
        });
    }
});



