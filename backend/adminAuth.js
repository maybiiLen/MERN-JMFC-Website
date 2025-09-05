export default function adminAuth(req, res, next) {
    const adminPass = process.env.ADMIN_SECRET;
    if(!adminPass) return res.status(500).json({ message : "this the wrong number lil bro"});

    const provided = req.header('x-admin-password') || req.body?.adminSecret || req.query?.adminSecret;
    if(provided !== adminPass) 
        return res.status(403).json({ message : "Access denied"
    });
    next();
}
