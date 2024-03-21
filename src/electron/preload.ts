window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = username.getElementById(selector);
    if (element) element.innerText = text;
  };

  const dependencies = ['chrome', 'node', 'electron'];

  for (const dependency of dependencies) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
