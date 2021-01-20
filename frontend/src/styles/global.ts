import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --primary-color: #34CB79;
    --title-color: #322153;
    --text-color: #6C6C80;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline:0;
  }

  body{
    background: #F0F0F5;
    -webkit-font-smoothing: antialiased;
    color: var(--text-color);
  }

  html, body, #root {
    height: 100%
  }

  body, button {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  input[type=text],
  input[type=email],
  input[type=number]
   {
    flex: 1;
    background: #F0F0F5;
    border-radius: 8px;
    border: 0;
    padding: 16px 24px;
    font-size: 16px;
    color: #6C6C80;
  }

  a{
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ol, ul {
    list-style: none;
  }


  h1, h2, h3, h4, h5, h6 {
    color: var(--title-color);
    font-family: Ubuntu;
  }

  button{
    cursor: pointer;
    background: 0;
    border: none;
  }
`
