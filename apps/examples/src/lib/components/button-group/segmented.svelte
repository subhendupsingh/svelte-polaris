<script lang="ts">
    import { ButtonGroup, Button } from "svelte-polaris";

    let selectedView: string = "list";

    function setView(view: string) {
        selectedView = view;
    }
</script>

<ButtonGroup variant="segmented">
    <Button pressed={selectedView === "list"} onClick={() => setView("list")}>
        List
    </Button>
    <Button pressed={selectedView === "grid"} onClick={() => setView("grid")}>
        Grid
    </Button>
    <Button pressed={selectedView === "card"} onClick={() => setView("card")}>
        Card
    </Button>
</ButtonGroup>
