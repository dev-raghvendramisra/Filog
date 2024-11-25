import { appwriteAuthService } from "../appwrite-services/index.js";

export default async function authService(req,res){
     //  conf.projectEndpoint
     res.setHeader('Access-Control-Allow-Origin', "*"); // Update with correct frontend URL
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed methods
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
     res.setHeader('Access-Control-Allow-Credentials', 'true');

        if(req.method==="OPTIONS"){
            return res.status(200).end();
        }

        try {

            console.log(req.body)

            if (!req.body) {
                console.log("Invalid request")
                return res.status(404).json({ ok: false, res: "Invalid request", code: 404 })
            }
            if (!req.body.action) {
                console.log("Request lacks action parameter")
                return res.status(404).json({ ok: false, res: "Invalid action", code: 404 })
            }
            if (req.body.action.toLowerCase() == "reset-password" ){
                if (!req.body.userId || !req.body.password){
                    console.log("Request lacks  or password")
                    return res.status(404).json({ ok: false, res: "Invalid request", code: 404 })
                }
            }

            const { action } = req.body;

            console.log("Request received for action: ", action);

            if(action.toLowerCase() == "reset-password"){
                const { userId, password } = req.body;
                const resetPasswordRes = await appwriteAuthService.resetPassword(userId, password)
                if(resetPasswordRes.ok){
                    return res.status(resetPasswordRes.code).json({ ok: resetPasswordRes.ok, res: resetPasswordRes.res, code: resetPasswordRes.code })
                }
                return res.status(resetPasswordRes.code).json({ ok: resetPasswordRes.ok, res: resetPasswordRes.res, code: resetPasswordRes.code })
            }
        }
        catch (error) {
            console.log("Error in emailService", error)
            return res.status(500).json({ ok: false, res: error, code: 500 })
        }

    }