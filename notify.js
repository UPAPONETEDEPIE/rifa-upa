export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { numero, nombre, telefono } = req.body;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Rifa UPA <notificaciones@upaponetedepie.org>',
      to: 'upaponetedepie@gmail.com',
      subject: `Nuevo número vendido: #${String(numero).padStart(3,'0')}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
          <div style="background:#e32d2d;padding:16px 24px;border-radius:10px 10px 0 0;">
            <h1 style="color:#fff;font-size:20px;margin:0;">Nuevo número vendido</h1>
          </div>
          <div style="border:1px solid #eee;border-top:none;padding:20px 24px;border-radius:0 0 10px 10px;">
            <table style="width:100%;font-size:15px;">
              <tr><td style="color:#888;padding:6px 0;">Número</td><td style="font-weight:700;color:#e32d2d;">#${String(numero).padStart(3,'0')}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Nombre</td><td style="font-weight:600;">${nombre}</td></tr>
              <tr><td style="color:#888;padding:6px 0;">Teléfono</td><td>${telefono}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0;">
            <p style="font-size:13px;color:#aaa;margin:0;">UPA Ponete de Pie · Rifa Solidaria 2026</p>
          </div>
        </div>
      `
    })
  });

  res.status(200).json({ ok: true });
}
