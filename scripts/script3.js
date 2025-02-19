const hre = require("hardhat");

async function main() {
    const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    const Weth = await hre.ethers.getContractAt("IWETH", WETH_ADDRESS);
    const impersonatedSigner = await ethers.getImpersonatedSigner("0x1234567890123456789012345678901234567890");

    let balanceOfAUser = await Weth.balanceOf("0x687F62c43Bc8375eEaa764996e79d83455A4B36c")
    console.log(balanceOfAUser.toString())

    let transaction = await Weth.connect(impersonatedSigner).deposit({value: hre.ethers.parseEther('0.1111')})
    await transaction.wait()

    balanceOfAUser = await Weth.balanceOf("0x1234567890123456789012345678901234567890")
    console.log(balanceOfAUser.toString())

    transaction = await Weth.connect(impersonatedSigner).withdraw(hre.ethers.parseEther('0.1111'))
    await transaction.wait()

    balanceOfAUser = await Weth.balanceOf("0x1234567890123456789012345678901234567890")
    console.log(balanceOfAUser.toString())
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
