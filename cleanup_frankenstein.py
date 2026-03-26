import os
import re

standard_ending = """
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-client.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', async () => {
    if(typeof window.supabaseClient === 'undefined') return;
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if(session) {
      localStorage.setItem('hhLoggedIn', 'true');
      const navRight = document.querySelector('.nav-right');
      if(navRight) {
        navRight.innerHTML = `
          <a href="dashboard.html" class="nav-btn nav-btn-outline" style="border-color:var(--cyan);color:var(--cyan);margin-right:12px;">Dashboard</a>
          <button onclick="window.supabaseClient.auth.signOut().then(()=>{localStorage.removeItem('hhLoggedIn');window.location.href='home.html'})" class="nav-btn nav-btn-solid" style="background:rgba(244,63,94,0.1);color:var(--crimson);border:1px solid rgba(244,63,94,0.4);">Sign Out</button>
        `;
      }
    } else {
      localStorage.removeItem('hhLoggedIn');
    }
  });
</script>
<script src="hh-ux-effects.js"></script>
</body>
</html>
"""

investors_logic = """
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-client.js"></script>
<script>
async function fetchPublicInvestors() {
  const grid = document.querySelector('.inv-grid');
  if(!grid) return;
  const isLoggedIn = localStorage.getItem('hhLoggedIn') === 'true';
  const { data, error } = await window.supabaseClient.from('investors').select('*').order('created_at', { ascending: false }).limit(6);
  const fallbackData = [
    { company_name: "Sequoia Surge", investor_type: "VC Firm", city: "Bengaluru" },
    { company_name: "Elevation Capital", investor_type: "VC Firm", city: "Gurugram" },
    { company_name: "Kalaari Capital", investor_type: "VC Firm", city: "Bengaluru" }
  ];
  const finalData = (data && data.length > 0) ? data : fallbackData;
  if(finalData.length > 0) { grid.innerHTML = ''; }
  finalData.forEach(inv => {
    const card = document.createElement('div');
    card.className = 'inv-card reveal glow-card' + (!isLoggedIn ? ' blur-preview' : '');
    const name = inv.company_name || inv.full_name || 'Global Investor';
    const type = inv.investor_type || 'Angel / VC';
    const location = inv.city || 'India';
    card.innerHTML = `
      ${!isLoggedIn ? `<div class="blur-overlay"><div class="lock-icon">🔒</div><div class="lock-text">Premium Network Locked</div><a href="login.html" class="lock-btn">Login to View Details</a></div>` : ''}
      <div class="inv-avatar" style="background:var(--vivid-dim);color:var(--vivid2);">${name.charAt(0)}</div>
      <div class="inv-name">${name}</div>
      <div class="inv-partner">${type}</div>
      <div class="inv-city">${location}</div>
      <div class="inv-desc">Actively looking for disruptive startups.</div>
    `;
    grid.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded', async () => {
    if(window.location.pathname.includes('investors.html')) fetchPublicInvestors();
    if(typeof window.supabaseClient === 'undefined') return;
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if(session) {
      localStorage.setItem('hhLoggedIn', 'true');
      const navRight = document.querySelector('.nav-right');
      if(navRight) {
        navRight.innerHTML = `
          <a href="dashboard.html" class="nav-btn nav-btn-outline" style="border-color:var(--cyan);color:var(--cyan);margin-right:12px;">Dashboard</a>
          <button onclick="window.supabaseClient.auth.signOut().then(()=>{localStorage.removeItem('hhLoggedIn');window.location.href='home.html'})" class="nav-btn nav-btn-solid" style="background:rgba(244,63,94,0.1);color:var(--crimson);border:1px solid rgba(244,63,94,0.4);">Sign Out</button>
        `;
      }
    }
});
</script>
<script src="hh-ux-effects.js"></script>
</body>
</html>
"""

home_logic = """
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-client.js"></script>
<script>
const startupSteps = [
 {icon:'📋', num:'01', title:'Build Your Profile', desc:'Upload your DPIIT certificate, pitch deck, financials and team info.'},
 {icon:'🤖', num:'02', title:'AI Matching', desc:'Our algorithm matches you with investors.'},
 {icon:'🤝', num:'03', title:'Connect & Pitch', desc:'Message investors directly.'},
 {icon:'🚀', num:'04', title:'Close the Deal', desc:'Confirm your deal through the platform.'}
];
const investorSteps = [
 {icon:'🔍', num:'01', title:'Define Your Thesis', desc:'Set your investment preferences.'},
 {icon:'📬', num:'02', title:'Curated Deal Flow', desc:'Receive AI-matched, DPIIT-verified startups.'},
 {icon:'📁', num:'03', title:'Diligence & Connect', desc:'Access data rooms, schedule Zoom calls.'},
 {icon:'✅', num:'04', title:'Invest with Conviction', desc:'Confirm your investment through the platform.'}
];
function switchTab(type) {
 document.querySelectorAll('.tab-btn').forEach((btn, i) => { btn.classList.toggle('active', (type === 'startup' && i === 0) || (type === 'investor' && i === 1)); });
 const steps = document.querySelectorAll('.step');
 const data = type === 'startup' ? startupSteps : investorSteps;
 steps.forEach((step, i) => { if(steps[i]) { step.querySelector('.step-icon').textContent = data[i].icon; step.querySelector('.step-num').textContent = data[i].num; step.querySelector('h4').textContent = data[i].title; step.querySelector('p').textContent = data[i].desc; } });
}

document.addEventListener('DOMContentLoaded', async () => {
    if(typeof window.supabaseClient === 'undefined') return;
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if(session) {
      localStorage.setItem('hhLoggedIn', 'true');
      const navRight = document.querySelector('.nav-right');
      if(navRight) {
        navRight.innerHTML = `
          <a href="dashboard.html" class="nav-btn nav-btn-outline" style="border-color:var(--cyan);color:var(--cyan);margin-right:12px;">Dashboard</a>
          <button onclick="window.supabaseClient.auth.signOut().then(()=>{localStorage.removeItem('hhLoggedIn');window.location.href='home.html'})" class="nav-btn nav-btn-solid" style="background:rgba(244,63,94,0.1);color:var(--crimson);border:1px solid rgba(244,63,94,0.4);">Sign Out</button>
        `;
      }
    }
});
</script>
<script src="hh-ux-effects.js"></script>
</body>
</html>
"""

def cleanup_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    footer_match = list(re.finditer(r'</footer>', content))
    if not footer_match:
        print(f"Skipping {filename}: no </footer> found")
        return

    last_footer_end = footer_match[-1].end()
    new_content = content[:last_footer_end]
    
    if filename == 'investors.html':
        new_content += investors_logic
    elif filename == 'home.html':
        new_content += home_logic
    else:
        new_content += standard_ending
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Cleaned {filename}")

files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in files:
    if os.path.getsize(f) > 50000: # Simple heuristic for bloated files
        cleanup_file(f)
    elif f in ['investors.html', 'home.html']: # Always clean these
        cleanup_file(f)
