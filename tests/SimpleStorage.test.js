const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
// Dans la vidéo, Ben install la dépendance ci-dessous (yarn add --dev @nomicfoundation/hardhat-network-helpers) mais moi j'avais pas besoin perso
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("SimpleStorage tests", function() {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployContract() {
        const [owner, otherAccount] = await ethers.getSigners();
        const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
        // pas nécessaire de passer SimpleStorage en argument de deploy ci-dessous
        const simpleStorage = await SimpleStorage.deploy(SimpleStorage);

        return { simpleStorage, owner, otherAccount };
    }

    describe('Deployment', function(){
        it('Should deploy the SC', async function() {
            const {simpleStorage} = await loadFixture(deployContract)
            expect(await simpleStorage.getValue()).to.equal(0)
        })
    })

    describe('Set', function(){
        it('Should set a new value inside the smart', async function() {
            const {simpleStorage, owner, otherAccount} = await loadFixture(deployContract)
            const newValue = 42
            await simpleStorage.connect(otherAccount).setValue(newValue)
            const storedValue = await simpleStorage.getValue()
            expect(storedValue).to.equal(newValue)
        })
    })

    describe('getCurrentTimestamp', function() {
        it('Should get the time', async function() {
            const {simpleStorage} =  await loadFixture(deployContract)
            await helpers.time.increaseTo(2000000000)
            let getCurrentTimestamp = await simpleStorage.getCurrentTime()
            expect(Number(getCurrentTimestamp)).to.be.equal(2000000000)

            // mine several blocks
            await helpers.mine(1000, { interval: 15 })
            let timestampOfLastBlock = await helpers.time.latest()
            console.log(Number(timestampOfLastBlock))
        })
    })
})
