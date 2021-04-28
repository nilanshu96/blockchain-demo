# SIMPLECHAIN BLOCKCHAIN-DEMO

### A really simple blockchain-demo created for [Coding Challenge 36](https://github.com/zero-to-mastery/coding_challenge-36)
### Website: https://nilanshu96.github.io/blockchain-demo/

## Notes:
1. Uses RTCPeerConnection for peer management
2. Uses ReactJs (only react hooks) for the frontend
3. Uses a backend API for crypto operations. The github page uses API hosted on Amazong Gateway which uses Amazon lambda.
4. Backend that can be used to test on local: https://github.com/nilanshu96/blockchain-demo-backend
5. The blockchain reconciliation logic is kept very simple. An invalid blockchain can entirely get replaced if it's being reconciled with a valid blockchain. The reconciliation takes place automatically whenever we shift to another peer to show the peers are constantly connected with each other.
6. The site is responsive to mobile screens
7. The project uses Github Actions to inject the API URI
