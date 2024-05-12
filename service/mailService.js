import nodemailer from "nodemailer";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: "587",
            secure: false,
            auth: {
                user: "qop6261@gmail.com",
                pass: "sctj wnja oceo wqon"
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: "qop6261@gmail.com",
            to: to,
            subject: "Активация аккаунта на" + "http://localhost:8080",
            text: "",
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>   
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
    }
}

export default new MailService();