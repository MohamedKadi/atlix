'use client';
import Navbar from '@/components/ui/Navbar';
import globals from './globals.css';

const styles = {
  footer: {
    background: '#283618',
    color: '#fff',
    textAlign: 'center',
    padding: '40px 20px',
  },
  footerTitle: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '15px',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#dda15e',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="">{children}</main>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerTitle}>ATLIX – Feel Morocco. Live Morocco.</p>
          <p style={{ marginBottom: '15px' }}>
            📧 support@atlix.travel | 📍 Mohammedia, Morocco
          </p>
          <div style={styles.footerLinks}>
            <a
              href="#"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#f4d03f')}
              onMouseOut={(e) => (e.target.style.color = '#dda15e')}
            >
              Instagram
            </a>
            <a
              href="#"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#f4d03f')}
              onMouseOut={(e) => (e.target.style.color = '#dda15e')}
            >
              Facebook
            </a>
            <a
              href="#"
              style={styles.footerLink}
              onMouseOver={(e) => (e.target.style.color = '#f4d03f')}
              onMouseOut={(e) => (e.target.style.color = '#dda15e')}
            >
              LinkedIn
            </a>
          </div>
          <a
            href="https://github.com/MohamedKadi"
            className="font-medium text-orange-600 dark:text-blue-500 hover:underline"
            target="_blank"
          >
            @copyrighted by AIT EL KADI Mohamed
          </a>
        </footer>
      </body>
    </html>
  );
}
