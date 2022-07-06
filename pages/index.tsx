import type { NextPage } from 'next'

const Home: NextPage = () => {
  //Temporary only for description
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column'}}>
      <div style={{textAlign: 'left'}}>
        <h1>Figma API Converter</h1>
        <p>Get React components with CSS styles directly from Figma without coding :D</p>
        <p><strong>This is very early concept, not workin version!</strong></p>
        <ol>
          <li>Open Figma File: <a href="https://www.figma.com/file/euk32TK4WfvqBQzU9mrVPw/Figma-Converter?node-id=307%3A455" target="_blanck">https://www.figma.com/file/euk32TK4WfvqBQzU9mrVPw/Figma-Converter?node-id=307%3A455</a></li>
          <li>Open API colors: <a href="/api/v1/styles?figmaFileKey=euk32TK4WfvqBQzU9mrVPw&figmaToken=328358-acbf12db-9f51-4242-af76-ee9dce07dd47&figmaStyleType=FILL" target="_blanck">/api/v1/styles?figmaFileKey=euk32TK4WfvqBQzU9mrVPw&figmaToken=328358-acbf12db-9f51-4242-af76-ee9dce07dd47&figmaStyleType=FILL</a></li>
          <li>Open API fonts: <a href="/api/v1/styles?figmaFileKey=euk32TK4WfvqBQzU9mrVPw&figmaToken=328358-acbf12db-9f51-4242-af76-ee9dce07dd47&figmaStyleType=TEXT" target="_blanck">/api/v1/styles?figmaFileKey=euk32TK4WfvqBQzU9mrVPw&figmaToken=328358-acbf12db-9f51-4242-af76-ee9dce07dd47&figmaStyleType=TEXT</a></li>
          <li>Change Text Style and Color Style in Figma (not in layers but in assets - right sidebar) and refresh API page</li>
        </ol>
      </div>
    </div>
  )
}

export default Home
