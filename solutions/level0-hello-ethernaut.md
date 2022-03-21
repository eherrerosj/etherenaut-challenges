Basic exercise to get comfortable with the console, calling functions and reading properties.

### Solution
Run the following commands in the console in order:
```
await contract.info()
await contract.info1()
await contract.info2("hello")
await contract.infoNum().then(v => v.toString())
await contract.info42()
await contract.theMethodName()
await contract.method7123949()
await contract.password()
await contract.authenticate('ethernaut0')
```