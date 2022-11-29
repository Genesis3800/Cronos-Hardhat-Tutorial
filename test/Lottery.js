const { expect } = require("chai");
const hre = require("hardhat");
describe("Lottery", function () {
    let owner, player1, player2, lottery;
    before(async () => {
        [owner, player1, player2] = await ethers.getSigners();
        provider = await ethers.getDefaultProvider();
        const Lottery = await hre.ethers.getContractFactory("Lottery");
        console.log("Deploying Contract for testing.......")
        lottery = await Lottery.deploy();
        await lottery.deployed();
    });
    it("Should set owner correctly", async function () {
        const ownerAddress = await lottery.owner();
        console.log("owner from contract is : ", ownerAddress);
        expect(await ownerAddress).to.equal(owner.address);
    });
    it("Non-owner shouldn't be able to start lottery", async function () {
        await expect(lottery.connect(player1).startLottery()).to.be.revertedWith("Only owner can call this function");
    });
    it("Should start lottery event", async function () {
        let lotteryInProgress = await lottery.lotteryInProgress();
        console.log("Current value of lotteryInProgress is : ", lotteryInProgress);
        await lottery.startLottery();
        console.log("New value of lotteryInProgress is : ", await lottery.lotteryInProgress());
        expect(await lottery.lotteryInProgress()).to.equal(true);
    });
    it("Player 1 should be 1st participant", async function () {
        await lottery.connect(player1).enterLottery({ value: ethers.utils.parseEther("2.0") });
        let participant1 = await lottery.players(0);
        player1Balance = await ethers.provider.getBalance(player1.address);
        console.log("Remaining ETH with player1: ", player1Balance / (10 ** 18));
        expect(participant1).to.equal(player1.address);
    });
    it("Player 2 should be 2nd participant", async function () {
        await lottery.connect(player2).enterLottery({ value: ethers.utils.parseEther("3.0") });
        let participant2 = await lottery.players(1);
        player2Balance = await ethers.provider.getBalance(player2.address);
        console.log("Remaining ETH with player2: ", player2Balance / (10 ** 18));
        expect(participant2).to.equal(player2.address);
    });
    it("pickWinner() function should not be called by non-owner", async function () {
        await expect(lottery.connect(player1).pickWinner()).to.be.revertedWith("Only owner can call this function");
    });
    it("pickWinner() function should work correctly", async function () {
        lottery.pickWinner();
        LotteryId = lottery.lotteryId();
        let Winner = await lottery.lotteryHistory(LotteryId);
        let WinnerBalance = await ethers.provider.getBalance(Winner);
        console.log("Winner is: ", Winner);
        console.log("Winner address is:", WinnerBalance / (10 ** 18));
        expect(await Winner).to.satisfy(function (anyWinner) {
            if ((anyWinner == player1.address) || (anyWinner == player2.address)) {
                return true;
            } else {
                return false;
            }
        });
    });
});