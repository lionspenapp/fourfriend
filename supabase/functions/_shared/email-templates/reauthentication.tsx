/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Lion's Pen verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={brand}>LION'S PEN</Heading>
        <Text style={tagline}>The Inner Scriptorium</Text>
        <div style={divider} />
        <Heading style={h1}>Verification Code</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          This code will expire shortly. If you didn't request it, you may safely ignore this message.
        </Text>
        <Text style={signature}>— The Celestial Scriptorium</Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '40px 32px', maxWidth: '560px' }
const brand = { fontSize: '28px', fontWeight: 'bold' as const, color: '#1B3A6B', letterSpacing: '0.2em', textAlign: 'center' as const, margin: '0 0 4px' }
const tagline = { fontSize: '12px', color: '#C8962E', letterSpacing: '0.3em', textTransform: 'uppercase' as const, textAlign: 'center' as const, margin: '0 0 24px' }
const divider = { height: '2px', backgroundColor: '#C8962E', margin: '0 0 32px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1B3A6B', margin: '0 0 20px', letterSpacing: '0.05em' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 18px' }
const codeStyle = { fontFamily: 'Courier, monospace', fontSize: '28px', fontWeight: 'bold' as const, color: '#1B3A6B', letterSpacing: '0.3em', textAlign: 'center' as const, margin: '0 0 30px', padding: '16px', backgroundColor: '#F5E6C8', borderRadius: '6px' }
const footer = { fontSize: '13px', color: '#888888', lineHeight: '1.5', margin: '24px 0 0', fontStyle: 'italic' as const }
const signature = { fontSize: '13px', color: '#C8962E', margin: '24px 0 0', textAlign: 'center' as const, letterSpacing: '0.1em' }
