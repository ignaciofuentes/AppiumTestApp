describe('AWS Demo App', () => {
  it('should display and click the Get Started button', async () => {
    const button = await $('~get_started_button');
    await button.click();
    const alertText = await driver.getAlertText();
    expect(alertText).toContain('Pressed');
    await driver.acceptAlert();
  });

  it('should show a Learn More Button', async () => {
    const button = await $('~learn_more_button');
    expect(await button.elementId).toBeTruthy();
  });

  it('should show a Our Services Label', async () => {
    const label = await $('~our_services_label');
    var elementId = await label.elementId;
    expect(elementId).toBeTruthy();
  });
});
