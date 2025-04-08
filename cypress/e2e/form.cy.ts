describe('Form Submission Flow', () => {
  it('should navigate from home to form page, submit a form, and see the submission in the list', () => {
    // Ana sayfayı ziyaret et
    cy.visit('/')
    
    // Form sayfasına git
    cy.contains('Form Sayfasına Git').click()
    cy.url().should('include', '/form')
    
    // Form alanlarını doldur
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="company"]').type('Test Company')
    cy.get('input[name="mobile_phone"]').type('07123456789')
    cy.get('input[name="email_address"]').type('test@example.com')
    cy.get('input[name="postcode"]').type('AB12 3CD')
    
    // Ödeme seçeneği seç
    cy.contains('label', 'PayLater').find('input[type="checkbox"]').check()
    
    // Formu gönder
    cy.contains('button', 'Register').click()
    
    // Başarı mesajını bekle
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Form başarıyla gönderildi!')
    })
    
    // Listeleme sayfasına git
    cy.visit('/list')
    
    // Gönderilen veriyi kontrol et
    cy.contains('Test User').should('be.visible')
    cy.contains('Test Company').should('be.visible')
    cy.contains('07123456789').should('be.visible')
    cy.contains('test@example.com').should('be.visible')
    cy.contains('AB12 3CD').should('be.visible')
    cy.contains('Sonra Öde').should('be.visible')
  })
})