const KingOfEther = artifacts.require("./KingOfEther.sol");
const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("KingOfEther", accounts => {
    const ownerAccount = accounts[0];
    const theFirstKingAccount = accounts[1];
    const theSecondKingAccount = accounts[2];
    let KingOfEtherInstance;

    //create new smart contract FixedEtherGameInstance before each test method
    beforeEach(async function() {
        KingOfEtherInstance = await KingOfEther.new({from: ownerAccount});
    });

    it("Hail the First King", async () => {   
        await KingOfEtherInstance.claimThrone({from: theFirstKingAccount, value: new BN(web3.utils.toWei("1", "ether"))});
        let currentKingAddress = await KingOfEtherInstance.king();
        let currenBalance = await KingOfEtherInstance.balance();
        expect(new BN(currentKingAddress)).to.be.a.bignumber.equal(new BN(theFirstKingAccount));
        expect(new BN(currenBalance)).to.be.a.bignumber.equal(new BN(web3.utils.toWei("1", "ether")));
    });

    it("The First King is Dead – Long Live the Second King", async () => {   
        await KingOfEtherInstance.claimThrone({from: theFirstKingAccount, value: new BN(web3.utils.toWei("1", "ether"))});
        let theFirstKingBefore = new BN(await web3.eth.getBalance(theFirstKingAccount));
        await KingOfEtherInstance.claimThrone({from: theSecondKingAccount, value: new BN(web3.utils.toWei("2", "ether"))});
        
        expect(await KingOfEtherInstance.king()).to.equal(theSecondKingAccount);
        expect(await KingOfEtherInstance.balance()).to.be.a.bignumber.equal(web3.utils.toWei("2", "ether"));
        expect(new BN(await web3.eth.getBalance(theFirstKingAccount))).bignumber.equal(theFirstKingBefore.add(new BN(web3.utils.toWei("1", "ether"))));
    });
  
});