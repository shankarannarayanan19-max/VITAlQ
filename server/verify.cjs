const http = require('http');

function request(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : '';
    const headers = { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(bodyStr) };
    if (token) headers['Authorization'] = 'Bearer ' + token;
    const req = http.request({ hostname: 'localhost', port: 5000, path, method, headers }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function main() {
  // Login as admin
  const login = await request('POST', '/api/auth/login', { username: 'admin', password: 'admin123' });
  console.log('=== LOGIN ===');
  console.log('Status:', login.status);
  console.log(login.body);

  const parsed = JSON.parse(login.body);
  const token = parsed.token;
  if (!token) { console.log('NO TOKEN — stopping'); return; }

  // GET /api/patients
  const patients = await request('GET', '/api/patients', null, token);
  console.log('\n=== GET /api/patients ===');
  console.log('Status:', patients.status);
  console.log(patients.body);

  // GET /api/patients/VIT004
  const vit004 = await request('GET', '/api/patients/VIT004', null, token);
  console.log('\n=== GET /api/patients/VIT004 ===');
  console.log('Status:', vit004.status);
  console.log(vit004.body);

  // GET /api/patients/VIT001
  const vit001 = await request('GET', '/api/patients/VIT001', null, token);
  console.log('\n=== GET /api/patients/VIT001 ===');
  console.log('Status:', vit001.status);
  console.log(vit001.body);

  // GET /api/patients/VIT002
  const vit002 = await request('GET', '/api/patients/VIT002', null, token);
  console.log('\n=== GET /api/patients/VIT002 ===');
  console.log('Status:', vit002.status);
  console.log(vit002.body);

  // GET /api/patients/VIT003
  const vit003 = await request('GET', '/api/patients/VIT003', null, token);
  console.log('\n=== GET /api/patients/VIT003 ===');
  console.log('Status:', vit003.status);
  console.log(vit003.body);
}

main().catch(console.error);
