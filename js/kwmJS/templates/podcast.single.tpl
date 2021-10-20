<div id="podcast_container">

    <div class="chapterHeadlinePodcast">
        <h1><&>title<&></h1>
        <p>von <&>author<&></p>
    </div>

    <button onclick="window.location.hash = window.Core.router.routes[3].slug;" id="backPodcastList"><- Back</button>

    <div class="podcastCardDetail">

        <div class="infoRowTop">
            <table class="table infoTable">
                <tbody>
                <tr>
                    <th>Title:</th>
                    <td><&>title<&></td>
                </tr>
                <tr>
                    <th>Author:</th>
                    <td><&>author<&></td>
                </tr>
                <tr>
                    <th>Publishing year:</th>
                    <td><&>year<&></td>
                </tr>
                <tr>
                    <th>Category:</th>
                    <td><&>category<&></td>
                </tr>
                <tr>
                    <th>
                        <button data-id="<&>id<&>" class="favourite mypodcast single">❤</button>
                    </th>
                    <td></td>
                </tr>
                </tbody>
            </table>
            <div class="infoImage">
                <img src="<&>image_url<&>" alt="Cover von <&>title<&>" class="url">
            </div>
        </div>
        <hr>
        <div class="infoRowMiddle">
            <div class="infoLinkPodcast">
                <!-- Über <&>link<&> wird immer ein Objekt mitgegeben, für Demonstration deshalb statisch eingebunden -->
                <iframe src="<&>link<&>" title="<&>title<&> von <&>author<&>" frameborder="0" allow="autoplay; clipboard-write; encrypted-media;" scrolling="no"></iframe>
                <!-- <iframe src="https://open.spotify.com/embed/episode/3yDtCOfPmH77JDnKE6PC5U" title="<&>title<&> von <&>author<&>" frameborder="0" allow="autoplay; clipboard-write; encrypted-media;" scrolling="no"></iframe> -->
            </div>

            <div class="infoText">
                <p class="text"><&>text<&></p>
            </div>
        </div>
        <hr>
        <div class="infoRowBottom">
            <div id="comments">
                <h5 class="commentHeadlineLeft">Comments</h5>

            </div>
            <div class="commentForm">
                <h5 class="commentHeadlineRight">Add a new comment</h5>
                <textarea name="newComment" class="newComment" rows="8" placeholder="Your Comment..."></textarea>
                <button class="sendComment">Send</button>
            </div>
        </div>

    </div>


</div>