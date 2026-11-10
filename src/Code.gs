function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Overview CR Backlog')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('New_CR Backlog');
  
  if (!sheet) {
    console.error("ไม่พบ Sheet ชื่อ 'New_CR Backlog'");
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return [];
  }
  
  // Remove Header
  const headers = data.shift();
  
  // Map rows according to the sheet layout
  const rows = data.map(row => {
    return {
      queueNo: row[0] || '',
      sa: row[1] || '',
      description: row[7] || '',
      priority: row[13] || '',
      status: row[9] || '',
      systemCategory: row[11] || '',
      group: row[14] || '',
      avgShirtsSize: row[17] || '',
      mdsRange: row[18] || '',
      actualMDs: row[16] || '',
      expectedStart: row[19] instanceof Date ? row[19].toLocaleDateString('th-TH') : (row[19] || ''),
      expectedUAT: row[22] instanceof Date ? row[22].toLocaleDateString('th-TH') : (row[22] || '')
    };
  });
  
  return rows;
}
