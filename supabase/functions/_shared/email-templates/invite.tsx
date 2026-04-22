/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteUrl, confirmationUrl }: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to Lion's Pen</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={brand}>LION'S PEN</Heading>
        <Text style={tagline}>The Inner Scriptorium</Text>
        <div style={divider} />
        <Heading style={h1}>You Have Been Invited</Heading>
        <Text style={text}>
          You've been invited to join <Link href={siteUrl} style={link}>Lion's Pen</Link> —
          where you become who you were meant to be.
        </Text>
        <div style={buttonWrap}>
          <Button style={button} href={confirmationUrl}>Accept Invitation</Button>
        </div>
        <Text style={footer}>
          If you weren't expecting this invitation, you may safely ignore this message.
        </Text>
        <Text style={signature}>— The Celestial Scriptorium</Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '40px 32px', maxWidth: '560px' }
const brand = { fontSize: '28px', fontWeight: 'bold' as const, color: '#1B3A6B', letterSpacing: '0.2em', textAlign: 'center' as const, margin: '0 0 4px' }
const tagline = { fontSize: '12px', color: '#C8962E', letterSpacing: '0.3em', textTransform: 'uppercase' as const, textAlign: 'center' as const, margin: '0 0 24px' }
const divider = { height: '2px', backgroundColor: '#C8962E', margin: '0 0 32px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1B3A6B', margin: '0 0 20px', letterSpacing: '0.05em' }
const text = { fontSize: '15px', color: '#3a3a3a', lineHeight: '1.6', margin: '0 0 18px' }
const link = { color: '#1B3A6B', textDecoration: 'underline', fontWeight: 'bold' as const }
const buttonWrap = { textAlign: 'center' as const, margin: '32px 0' }
const button = { backgroundColor: '#1B3A6B', color: '#ffffff', fontSize: '14px', fontWeight: 'bold' as const, borderRadius: '6px', padding: '14px 32px', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const footer = { fontSize: '13px', color: '#888888', lineHeight: '1.5', margin: '24px 0 0', fontStyle: 'italic' as const }
const signature = { fontSize: '13px', color: '#C8962E', margin: '24px 0 0', textAlign: 'center' as const, letterSpacing: '0.1em' }
