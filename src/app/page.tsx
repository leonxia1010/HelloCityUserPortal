import { Typography } from "@mui/material"
export default function Home() {
  return (
    <>
      <Typography variant="h1">Hello World with Cabinet-Grotsk</Typography>
      <Typography variant="h1" style={{ fontFamily: 'sans-serif' }}>Hello World with sans-serif</Typography>
      <Typography variant="h1" style={{ fontFamily: 'Inter' }}>Hello World with Inter</Typography>
      <Typography variant="h1" style={{ fontFamily: 'IBM Plex Sans' }}>Hello World with IBM Plex Sans</Typography>
    </>
  )
}
