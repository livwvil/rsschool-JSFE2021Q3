export default function createFragmentFromString(str) {
  const template = document.createElement('template');
  template.innerHTML = str;
  return template.content;
}
