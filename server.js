import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("🚀 الخادم يعمل بنجاح! استخدم /chat لإرسال الرسائل.");
});

// نقطة استقبال الرسائل
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // طلب للذكاء الاصطناعي OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.json({ reply: "❌ لم يتم استلام رد من OpenAI" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "⚠️ حدث خطأ في الخادم" });
  }
});

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
