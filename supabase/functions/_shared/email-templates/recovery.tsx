/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset your password for Lion's Pen</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={brand}>LION'S PEN</Heading>
        <Text style={tagline}>The Inner Scriptorium</Text>
        <div style={divider} />
        <Heading style={h1}>Reset Your Password</Heading>
        <Text style={text}>Dear Scriber,</Text>
        <Text style={text}>
          A request has been received to renew the key to your Inner Scriptorium.
          Click the button below to set a new password and step back into your practice.
        </Text>
        <div style={buttonWrap}>
          <Button style={button} href={confirmationUrl}>Reset Password</Button>
        </div>
        <Text style={footer}>
          If you didn't request a password reset, you may safely ignore this message —
          your password will remain unchanged.
        </Text>
        <Text style={signature}>— The Celestial Scriptorium</Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '40px 32px', maxWidth: '560px' }
const brand = { fontSize: '28px', fontWeight: 'bold' as const, color: '#1B3A6B', letterSpacing: '0.2em', textAlign: 'center' as const, margin: '0 0 4px' }
const tagline = { fontSize: '12px', color: '#C8962E', letterSpacing: '0.3em', textTransform: 'uppercase' as const, textAlign: 'center' as const, margin: '0 0 24px' }
const divider = { height: '2px', backgroundColor: '#C8962E', margin: '0 0 32px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1B3A6B', margin: '0 0 20px', letterSpacing: '0.05em' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 18px' }
const buttonWrap = { textAlign: 'center' as const, margin: '32px 0' }
const button = { backgroundColor: '#1B3A6B', color: '#ffffff', fontSize: '14px', fontWeight: 'bold' as const, borderRadius: '6px', padding: '14px 32px', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const footer = { fontSize: '13px', color: '#888888', lineHeight: '1.5', margin: '24px 0 0', fontStyle: 'italic' as const }
const signature = { fontSize: '13px', color: '#C8962E', margin: '24px 0 0', textAlign: 'center' as const, letterSpacing: '0.1em' }
