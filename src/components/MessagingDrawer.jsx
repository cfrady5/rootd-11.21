import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMessages, sendMessage } from '../lib/api/index.js';
import { useAuth } from '../context/AuthContext.jsx';
import { palette, radii, shadows } from '../lib/theme.js';
import { Button } from './director/PremiumComponents.jsx';

export default function MessagingDrawer() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [pending, setPending] = useState(false);
  const [input, setInput] = useState('');
  const unreadCount = 3;

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    fetchMessages(user?.id).then(({ data }) => {
      if (active) {
        setMessages(data ?? []);
      }
    });
    return () => {
      active = false;
    };
  }, [isOpen, user?.id]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setPending(true);
    const { data } = await sendMessage(user?.id, input.trim());
    if (data) {
      setMessages((prev) => [data, ...prev]);
    }
    setInput('');
    setPending(false);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: isOpen ? '360px' : '32px',
          bottom: '32px',
          zIndex: 40,
          transition: 'right 0.3s ease'
        }}
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            borderRadius: '999px',
            boxShadow: '0 20px 45px rgba(76, 89, 55, 0.35)',
            paddingInline: '24px'
          }}
        >
          <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 600 }}>{isOpen ? 'Close messages' : 'Open messages'}</span>
            <span
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-18px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '999px',
                backgroundColor: '#f97316',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              {unreadCount}
            </span>
          </span>
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: 360, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 360, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '320px',
              backgroundColor: '#fff',
              borderLeft: `1px solid rgba(0,0,0,0.08)`,
              boxShadow: shadows.panel,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 60
            }}
          >
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <p style={{ margin: 0, textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.08em', color: palette.grey }}>
                Partnership chat
              </p>
              <h3 style={{ margin: '8px 0 0', fontSize: '20px' }}>Live threads</h3>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 120px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ padding: '16px', borderRadius: radii.md, backgroundColor: palette.cream }}>
                  <p style={{ margin: 0, fontSize: '13px', color: palette.grey }}>{msg.sender}</p>
                  <p style={{ margin: '6px 0 0', fontWeight: 600 }}>{msg.body}</p>
                  <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#7c7c7c' }}>{msg.timestamp}</p>
                </div>
              ))}
              {messages.length === 0 && (
                <p style={{ color: palette.grey }}>No messages yet. Start a thread with a partner or compliance lead.</p>
              )}
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#fafafa' }}>
              <textarea
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a quick update"
                style={{
                  width: '100%',
                  borderRadius: radii.md,
                  border: '1px solid rgba(0,0,0,0.12)',
                  padding: '12px',
                  fontFamily: 'inherit',
                  marginBottom: '8px'
                }}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={pending}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: radii.md,
                  border: 'none',
                  backgroundColor: palette.pine,
                  color: 'white',
                  fontWeight: 600,
                  cursor: pending ? 'not-allowed' : 'pointer',
                  opacity: pending ? 0.7 : 1
                }}
              >
                {pending ? 'Sending…' : 'Send'}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
