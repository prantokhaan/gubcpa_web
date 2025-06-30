const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const TempStudent = require("../models/TempStudent");

router.post("/send-confirmation", async (req, res) => {
  const { id } = req.body;

  try {
    const student = await TempStudent.findOne({ where: { id } });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "beginnercpgub@gmail.com",
        pass: process.env.GOOGLE_PASS,
      },
    });

    const mailOptions = {
      from: '"GUB Competitive Programming Community" <beginnercpgub@gmail.com>',
      to: student.email,
      subject: "Beginner Batch Registration Confirmation - Summer 2025",
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style type="text/css">
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        /* Base styles */
        body, .body {
          font-family: 'Poppins', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          color: #333;
          line-height: 1.6;
          background-color: #f5f7fa;
        }
        
        /* Animation for email clients that support it */
        @media screen and (prefers-reduced-motion: no-preference) {
          .fade-in {
            animation: fadeIn 0.8s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
        
        /* Gradient header with subtle shine effect */
        .header {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
          position: relative;
          overflow: hidden;
        }
        .header:after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to bottom right,
            rgba(255,255,255,0.3) 0%,
            rgba(255,255,255,0) 60%
          );
          transform: rotate(30deg);
        }
        
        /* Card with subtle shadow and hover effect */
        .card {
          padding: 30px;
          background: #ffffff;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }
        
        /* Timeline items with hover effects */
        .timeline-item {
          display: flex;
          margin-bottom: 15px;
          align-items: flex-start;
          transition: all 0.2s ease;
          padding: 8px;
          border-radius: 6px;
        }
        .timeline-item:hover {
          background-color: #f8fafc;
          transform: translateX(4px);
        }
        
        /* Number badge with subtle glow */
        .number-badge {
          background: #3b82f6;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
        
        /* Button styles with hover effects */
        .btn {
          display: inline-block;
          padding: 12px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          margin-right: 10px;
          margin-bottom: 10px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        .btn-primary {
          background: #3b82f6;
          color: white !important;
          box-shadow: 0 2px 6px rgba(59, 130, 246, 0.2);
        }
        .btn-primary:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .btn-secondary {
          background: #f1f5f9;
          color: #1e40af !important;
          border: 1px solid #e2e8f0;
        }
        .btn-secondary:hover {
          background: #e2e8f0;
          transform: translateY(-1px);
        }
        
        /* Important note with attention-grabbing style */
        .important-note {
          background: #fff7ed;
          border-left: 4px solid #f97316;
          padding: 16px;
          margin: 20px 0;
          border-radius: 0 6px 6px 0;
        }
        .important-note strong {
          color: #ea580c;
        }
      </style>
    </head>
    <body>
      <div class="body fade-in">
        <div class="header">
          <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">Welcome to GUB Competitive Programming Community</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Beginner Batch Registration Confirmation - Summer 2025</p>
        </div>
        
        <div class="card">
          <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 25px;">
            <p style="margin: 0; font-size: 16px; color: #1e3a8a;">You have successfully registered to the <strong>Beginner Batch, Summer 2025</strong> program.</p>
          </div>
          
          <div class="important-note">
            <p style="margin: 0; font-size: 15px;"><strong>Important Note:</strong> You will not be able to login to gubcpa.com until you are selected for the Beginner Batch. Selection announcements will be made on 08 July 2025.</p>
          </div>
          
          <h3 style="color: #1e3a8a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 25px;">📅 Program Timeline</h3>
          
          <div style="margin: 20px 0;">
            <div class="timeline-item">
              <div class="number-badge">1</div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #1e40af;">Orientation</h4>
                <p style="margin: 0; color: #64748b;">30 June 2025</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="number-badge">2</div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #1e40af;">Math Assessment (Offline)</h4>
                <p style="margin: 0; color: #64748b;">04 July 2025</p>
                <p style="margin: 5px 0 0;">
                  <a href="https://tinyurl.com/beginner-math-test" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center;">
                    <span style="margin-right: 5px;">👉</span> Syllabus & Guidebook
                  </a>
                </p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="number-badge">3</div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #1e40af;">Assignment</h4>
                <p style="margin: 0; color: #64748b;">Given: 02 July 2025 | Deadline: 5 days</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="number-badge">4</div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #1e40af;">Selection Announcement</h4>
                <p style="margin: 0; color: #64748b;">08 July 2025</p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="number-badge">5</div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #1e40af;">First Class</h4>
                <p style="margin: 0; color: #64748b;">11 July 2025</p>
              </div>
            </div>
          </div>
          
          <h3 style="color: #1e3a8a; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 30px;">🔗 Important Links</h3>
          
          <div style="margin: 20px 0 30px;">
            <a href="https://classroom.google.com/c/NzgyNjg4ODExOTMz?cjc=m7apgfdg" target="_blank" class="btn btn-primary">
              <span style="margin-right: 8px;">📚</span> Google Classroom
            </a>
            <a href="https://m.me/j/AbY0sOsnenSr4_p7/" target="_blank" class="btn btn-primary">
              <span style="margin-right: 8px;">💬</span> Messenger Group
            </a>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
            <p style="margin: 0; color: #64748b;">Thank you and welcome to our community!</p>
            <p style="margin: 15px 0 0; color: #1e3a8a; font-weight: 600;">- GUB Competitive Programming Community</p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-size: 12px; color: #94a3b8;">© 2025 GUB Competitive Programming Community. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
    };

    await transporter.sendMail(mailOptions);

    student.isConfirmed = true;
    await student.save();

    res.status(200).json({ message: "Confirmation email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;
