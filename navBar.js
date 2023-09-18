export const navBar = `
<header id="header">
<div class="logoSection">
        <image id="logo" src="./media/RickMortyLogo8-2.png" alt="Logo"></image>

    </div>

    <div class="navSection">

        <div class="headerContent">
            <div class="headerDivisorLeft1">

                <a href="#" class="pageButtons" >Character</a>
                <a id="locationButton" href="#" class="pageButtons">Location</a>
                <a href="#" class="pageButtons">Episode</a>
            </div>
            <div class="headerDivisorRight1">
                <div class="inputDiv">
                    <a class="search">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" width="20" height="20">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </a>
                    <div class="input-field">
                        <input placeholder="Search" class="baseInput" type="text" aria-label="searchInput">
                      </div>
                </div>
                <div id="burger">Burger</div>    
            </div>
        </div>

        <div class="headerContent">
            <div class="headerDivisorLeft2">
                <a href="#" class="subPages"><</a>
                <div class="subPagesContainer">
                </div>
                <a href="#" class="subPages">></a>
            </div>
            <div class="headerDivisorRight2">
            </div>
            <div class="headerDivisorRight1Bottom">
                    <div class="inputDiv">
                        <a class="search">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" width="20" height="20">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </a>
                        <div class="input-field">
                            <input placeholder="Search" class="baseInput" type="text" aria-label="searchInput">
                          </div>
                    </div>
                    <div id="burger">Burger</div>    
            </div>
        </div>
    </div>
</header>

`