import "@openzeppelin/contracts/access/Ownable.sol";

contract Admin is Ownable {
    mapping(string => address) public event_admins;

    // Whitelisted addresses that can add event admins
    mapping(address => bool) public isWhitelisted;

    // Event to be emitted upon whitelisting of an admin
    event WhitelistAdmin(address indexed admin);
    // Event to be emitted upon removing an admin
    event RemoveAdmin(address indexed admin);

    constructor(address initialOwner) Ownable(initialOwner) {
        isWhitelisted[initialOwner] = true;
    }

    function setEventAdmin(string memory event_id, address admin) public {
        require (isWhitelisted[msg.sender], "not an admin");
        event_admins[event_id] = admin;
    }

    function getEventAdmin(string memory event_id) public view returns (address) {
        return event_admins[event_id];
    }

    function whitelist(address admin) public onlyOwner {
        isWhitelisted[admin] = true;
        emit WhitelistAdmin(admin);
    }

    function removeAdmin(address admin) public onlyOwner {
        isWhitelisted[admin] = false;
        emit RemoveAdmin(admin);
    }
}
