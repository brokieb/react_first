This is a [Next.js](https://nextjs.org/) project of shop for selling online accounts in two platforms: online store, allegro

## Getting Started

Create ENV file with given variables: 

```bash
MONGO_DB=
GITHUB_ID=
GITHUB_SECRET=
ALLEGRO_ID=
ALLEGRO_SECRET=
JWT_SIGNING_PRIVATE_KEY=//paste here JSON value returned from command "jose newkey -s 256 -t ec -a HS512" from [node-jose-tools]
ADDRESS=server address with http/s
NEXTAUTH_URL=//same as ADDRESS
HOTPAY_SECRET=
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Finally, open your browser with given address in env file
