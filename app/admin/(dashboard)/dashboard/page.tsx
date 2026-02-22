"use client"; // <--- JANGAN SAMPE KETINGGALAN, SAT!

import React from 'react';
import { LayoutDashboard, Image as ImageIcon, Calendar, Settings, LogOut, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      {/* CSS ini bakal nempel cuma di page ini doang, aman */}
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-container {
          min-height: 100vh;
          background-size: cover;
          display: flex;
          font-family: 'Inter', sans-serif;
          color: white;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }
        .dashboard-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(8px);
          z-index: 0;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 28px;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          z-index: 10;
        }
        .sidebar {
          width: 280px;
          margin-right: 20px;
          display: flex;
          flex-direction: column;
          padding: 35px 25px;
        }
        .main-content {
          flex: 1;
          z-index: 10;
          overflow-y: auto;
          padding-right: 10px;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 14px 20px;
          border-radius: 18px;
          transition: all 0.3s ease;
          cursor: pointer;
          color: rgba(255, 255, 255, 1);
          font-weight: 600;
        }
        .nav-item:hover, .nav-item.active {
          background: rgba(255, 255, 255, 1);
          color: white;
          transform: translateX(8px);
        }
        .card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px;
          margin-bottom: 24px;
          text-decoration: none;
          color: white;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-action:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-8px) scale(1.01);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .icon-box {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          font-weight: bold;
        }
        /* Biar scrollbar-nya nggak ngerusak estetika */
        .main-content::-webkit-scrollbar { width: 5px; }
        .main-content::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}} />

      {/* Sidebar - Fix Position */}
      <aside className="glass-panel sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '60px', paddingLeft: '10px' }}>
          <div style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', borderRadius: '14px', boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' }}></div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-1px' }}>ADMIN.CH</h2>
        </div>

        <nav style={{ flex: 1 }}>
          <div className="nav-item active"><LayoutDashboard size={22}/> <span>Dashboard</span></div>
          <div className="nav-item"><ImageIcon size={22}/> <span>Galeri</span></div>
          <div className="nav-item"><Calendar size={22}/> <span>Jadwal Misa</span></div>
        </nav>

        <div className="nav-item" style={{ color: '#fb7185', marginTop: 'auto' }}>
          <LogOut size={22}/> <span>Sign Out</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ marginBottom: '50px', marginTop: '10px' }}>
          <div className="glass-panel" style={{ padding: '35px 50px', display: 'inline-block' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: '900', margin: 0, lineHeight: 1 }}>Shalom, Admin ✨</h1>
            <p style={{ opacity: 0.5, marginTop: '12px', fontSize: '1.1rem', fontWeight: '500' }}>Dashboard gereja lo udah nggak jelek lagi sekarang.</p>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '30px' }}>
          <section>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '900', opacity: 0.3, letterSpacing: '3px', marginBottom: '25px', paddingLeft: '10px' }}>MAIN CONTROL</h3>
            
            <div className="glass-panel card-action">
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                <div className="icon-box" style={{ background: 'rgba(99, 102, 241, 0.2)' }}><ImageIcon className="text-indigo-300" /></div>
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Galeri Kegiatan</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>Manage and upload event documentation</p>
                </div>
              </div>
              <ChevronRight size={30} opacity={0.2} />
            </div>

            <div className="glass-panel card-action">
              <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                <div className="icon-box" style={{ background: 'rgba(245, 158, 11, 0.2)' }}><Calendar className="text-amber-300" /></div>
                <div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Jadwal Misa</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>Edit service times and special agendas</p>
                </div>
              </div>
              <ChevronRight size={30} opacity={0.2} />
            </div>
          </section>

          <aside>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '900', opacity: 0.3, letterSpacing: '3px', marginBottom: '25px', paddingLeft: '10px' }}>ANALYTICS</h3>
            <div className="glass-panel" style={{ padding: '40px' }}>
              <div style={{ marginBottom: '30px' }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '5px' }}>Total Visitors</p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>1,284</h2>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '15px' }}>
                  <div style={{ width: '70%', height: '100%', background: '#6366f1', borderRadius: '10px', boxShadow: '0 0 15px rgba(99, 102, 241, 0.6)' }}></div>
                </div>
              </div>
              
              <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', fontStyle: 'italic', opacity: 0.8 }}>
                  "Kodingan yang rapi adalah sebagian dari iman... atau setidaknya nggak bikin server meledak."
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}