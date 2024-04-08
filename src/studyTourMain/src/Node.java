import java.util.*;

// 定义节点类
public class Node implements Comparable<Node> {

    // 节点的权重
    int weight;
    // 节点的字符
    char ch;
    // 左子节点
    Node left;
    // 右子节点
    Node right;

    // 构造函数
    public Node(int weight, char ch) {
        this.weight = weight;
        this.ch = ch;
    }

    // 比较两个节点的权重
    @Override
    public int compareTo(Node other) {
        return this.weight - other.weight;
    }
}

// 哈夫曼编码类
public class HuffmanCoding {

    // 压缩字符串
    public static String compress(String str) {

        // 统计每个字符出现的频率
        Map<Character, Integer> freqMap = new HashMap<>();
        for (char ch : str.toCharArray()) {
            freqMap.put(ch, freqMap.getOrDefault(ch, 0) + 1);
        }

        // 构建哈夫曼树
        PriorityQueue<Node> queue = new PriorityQueue<>();
        for (Map.Entry<Character, Integer> entry : freqMap.entrySet()) {
            queue.add(new Node(entry.getValue(), entry.getKey()));
        }
        while (queue.size() > 1) {
            Node left = queue.poll();
            Node right = queue.poll();
            Node parent = new Node(left.weight + right.weight, '\0');
            parent.left = left;
            parent.right = right;
            queue.add(parent);
        }
        Node root = queue.poll();

        // 生成哈夫曼编码表
        Map<Character, String> codeMap = new HashMap<>();
        generateCode(root, "", codeMap);

        // 压缩字符串
        StringBuilder sb = new StringBuilder();
        for (char ch : str.toCharArray()) {
            sb.append(codeMap.get(ch));
        }
        return sb.toString();
    }

    // 生成哈夫曼编码表
    private static void generateCode(Node node, String code, Map<Character, String> codeMap) {
        if (node == null) {
            return;
        }
        if (node.ch != '\0') {
            codeMap.put(node.ch, code);
            return;
        }
        generateCode(node.left, code + "0", codeMap);
        generateCode(node.right, code + "1", codeMap);
    }

    // 解压缩字符串
    public static String decompress(String str, Map<Character, String> codeMap) {
        StringBuilder sb = new StringBuilder();
        Node node = new Node(0, '\0');
        for (char ch : str.toCharArray()) {
            if (ch == '0') {
                node = node.left;
            } else {
                node = node.right;
            }
            if (node.ch != '\0') {
                sb.append(node.ch);
                node = new Node(0, '\0');
            }
        }
        return sb.toString();
    }

    // 测试代码
    public static void main(String[] args) {
        String str = "This is a test string.";
        System.out.println("原始字符串：" + str);

        // 压缩字符串
        String compressedStr = compress(str);
        System.out.println("压缩后字符串：" + compressedStr);

        // 解压缩字符串
        String decompressedStr = decompress(compressedStr, codeMap);
        System.out.println("解压缩后字符串：" + decompressedStr);
    }
}
