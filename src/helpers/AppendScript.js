const AppendScript = (filePath) => {
  const script = document.createElement("script");

  script.src = filePath;
  script.async = true;

  document.body.appendChild(script);
};

export { AppendScript };
